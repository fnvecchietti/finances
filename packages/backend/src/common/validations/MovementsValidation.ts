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
)

export const movementSchema = object({
    description: string().required(),
    currency: string().required(),
    amount: number().required(),
    movementType: string().required().default('other'),
    date: date().required()
})