import { IncomeFilterableParams } from 'filters';
import { CreateMovementDto, MovementItem } from '../types/movement';
import { Movement } from '../common/models/Entity/Movement';

import { PostgresDataSource } from '../common/models/datasource';
import { Between } from 'typeorm';
import { movementSchema, bulkSchema } from '../common/validations/MovementsValidation';


export const searchMovementsService = async (filterableParams: IncomeFilterableParams, username?: string) => {
    const range = filterableParams.from && filterableParams.to? Between(filterableParams.from, filterableParams.to) : null;
    console.log('for username', username);
    
    return await Movement.findAndCount({
        where: {
            description: filterableParams.description,
            date: range,
            amount: filterableParams.amount,
            movementType: {type: filterableParams.type},
            id: filterableParams.id,
            createdBy: {username: username,}
        },
        take: filterableParams.take,
        skip: filterableParams.skip,
        order: {
            date: filterableParams.order
        },
    });
};

export const createMovementService = async (movement: CreateMovementDto) => {
    movementSchema.validateSync(movement);

    const movementEntity = new Movement();
    movementEntity.createdBy.username = movement.username;
    movementEntity.amount = movement.amount;
    movementEntity.currency = movement.currency;
    movementEntity.date = movement.date;
    movementEntity.description = movement.description;
    movementEntity.movementType.type = movement.movementType;
    
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