import { IncomeFilterableParams } from 'filters';
import { CreateMovementDto, MovementItem } from '../types/movement';
import { Movement } from '../common/models/Entity/Movement';
import { array, date, number, object, string } from 'yup';
import { PostgresDataSource } from '../common/models/datasource';
import { Between } from 'typeorm';

const bulkSchema = array()
.of(
    object({
        description: string().required(),
        currency: string().required(),
        amount: number().required(),
        movementType: string().required().default('other'),
        date: date().required()
    })
)

const movementSchema = object({
    description: string().required(),
    currency: string().required(),
    amount: number().required(),
    movementType: string().required().default('other'),
    date: date().required()
})

export const searchMovementsService = async (filterableParams: IncomeFilterableParams) => {
    const range = filterableParams.from && filterableParams.to? Between(filterableParams.from, filterableParams.to) : null
    
    return await Movement.findAndCount({
        where: {
            description: filterableParams.description,
            date: range,
            amount: filterableParams.amount,
            movementType: {type: filterableParams.type},
            id: filterableParams.id
        },
        take: filterableParams.take,
        skip: filterableParams.skip,
        order: {
            date: filterableParams.order
        },
    })
}

export const createMovementService = async (movement: CreateMovementDto) => {
    movementSchema.validateSync(movement)
    const mov = {...new Movement, movement};
    return await Movement.insert(mov);
}

export const createBulkMovementsService = async (bulkMovements: CreateMovementDto[] | MovementItem[]) => {

    const queryRunner = PostgresDataSource.createQueryRunner()

    try {
        const result = bulkSchema.validateSync(bulkMovements)
        

        queryRunner.startTransaction()
        
        const bulk = result.map((mv: CreateMovementDto) => {
            const mov = {...new Movement, mv}
            return  mov;
        }) 

        await queryRunner.manager.save(Movement, bulk)
        
        await queryRunner.commitTransaction()
        
    } catch (error) {
        console.log(error);
        await queryRunner.rollbackTransaction()
    }finally{
        await queryRunner.release()
    }
    
}