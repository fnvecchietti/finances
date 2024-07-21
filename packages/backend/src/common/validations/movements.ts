import { array, date, number, object, string } from 'yup';



export const bulkSchema = array()
.of(
    object({
        description: string().required(),
        currency: string().required(),
        amount: number().required(),
        movementType: string().required().default('other'),
        date: date().required()
    })
);

export const movementSchema = object({
    amount: number().required(),
    currency: string().required(),
    date: date().required(),
    description: string().required(),
    movement_type: string().required().default('other'),
    created_by: string().required(),
    wallet: string().required()
});