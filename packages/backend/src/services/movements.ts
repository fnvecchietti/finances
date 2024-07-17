import { IncomeFilterableParams } from 'filters';
import { CreateMovementDto, MovementItem } from '../types/movement';
import { Movement } from '../common/models/Entity/movements';
import { PostgresDataSource } from '../common/models/datasource';
import { Between, ILike } from 'typeorm';
import { movementSchema, bulkSchema } from '../common/validations/movements';
import { Auth } from '../common/models/Entity/auth';
import { MovementType } from '../common/models/Entity/movements-types';


export const searchMovementsService = async (filterableParams: IncomeFilterableParams, username?: string) => {
    const range = filterableParams.from && filterableParams.to? Between(filterableParams.from, filterableParams.to) : null;
    const descript = filterableParams.description && filterableParams.description.length > 0? ILike(`%${filterableParams.description}%`) : null;
    
        return await Movement.findAndCount({
        where: {
            description: descript,
            date: range,
            amount: filterableParams.amount,
            movement_type: {type: filterableParams.type},
            id: filterableParams.id,
            created_by: {username: username,}
        },
        take: filterableParams.take,
        skip: filterableParams.skip,
        order: {
            date: filterableParams.order
        },
    });
};

export const createMovementService = async (movement: CreateMovementDto, username: string) => {
    movementSchema.validateSync(movement);

    const user = await Auth.findOneOrFail({where:{username: username}});
    const movemenType = await MovementType.findOneOrFail({where: {type: movement.movementType}});
    const movementEntity = new Movement();
    movementEntity.created_by = user;
    movementEntity.amount = movement.amount;
    movementEntity.currency = movement.currency;
    movementEntity.date = movement.date;
    movementEntity.description = movement.description;
    movementEntity.movement_type = movemenType;
    
    return await Movement.insert(movementEntity);
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
    const movement = await Movement.findOneOrFail({where:{id}, relations: {created_by: true}});
    if(movement.created_by.username === username){
        return await Movement.delete({id:movement.id});
    }
    throw new Error('not authorized');
};