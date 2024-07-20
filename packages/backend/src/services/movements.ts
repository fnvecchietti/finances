import { IncomeFilterableParams } from 'filters';
import { CreateMovementDto, MovementItem } from '../types/movement';
import { Movement } from '../common/models/Entity/movements';
import { PostgresDataSource } from '../common/models/datasource';
import { Between, ILike } from 'typeorm';
import { movementSchema, bulkSchema } from '../common/validations/movements';


export const searchMovementsService = async (filterableParams: IncomeFilterableParams, userId?: string) => {
    
    const range = filterableParams.from && filterableParams.to? Between(filterableParams.from, filterableParams.to) : null;
    const descript = filterableParams.description && filterableParams.description.length > 0? ILike(`%${filterableParams.description}%`) : null;
    
        return await Movement.findAndCount({
        where: {
            description: descript,
            date: range,
            amount: filterableParams.amount,
            movement_type: {type: filterableParams.type},
            id: filterableParams.id,
            created_by: {id: userId}
        },
        take: filterableParams.take,
        skip: filterableParams.skip,
        order: {
            date: filterableParams.order
        },
    });
};

export const createMovementService = async (movement: CreateMovementDto, userId: string) => {
    movementSchema.validateSync(movement);
        
    return await Movement.insert({
        amount: movement.amount,
        currency: movement.currency,
        date: movement.date,
        description: movement.description,
        movement_type: {id: movement.movement_type},
        created_by: {id: userId},
        wallet: {id: movement.wallet}
    });
};

export const createBulkMovementsService = async (bulkMovements: CreateMovementDto[] | MovementItem[]) => {

    const queryRunner = PostgresDataSource.createQueryRunner();

    try {
        const result = bulkSchema.validateSync(bulkMovements);
        

        queryRunner.startTransaction();
        
        const bulk = result.map((mv: CreateMovementDto) => {
            const mov = {...new Movement, mv};
            return  mov;
        }); 

        await queryRunner.manager.save(Movement, bulk);
        
        await queryRunner.commitTransaction();
        
    } catch (error) {
        console.log(error);
        await queryRunner.rollbackTransaction();
    }finally{
        await queryRunner.release();
    }
    
};

export const deleteMovementService = async (id: string, username:string) => {
    // const movement = await Movement.findOneOrFail({where:{id}, relations: {created_by: true}});
    // if(movement.created_by.username === username){
    //     return await Movement.delete({id:movement.id});
    // }
    throw new Error('not authorized');
};