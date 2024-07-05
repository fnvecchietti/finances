import { array, date, number, object, string } from 'yup';

export const bulkSchema = array().of(
    object({
      name: string(),
      ticker: string(),
      quantity: number(),
      purchase_price: number(),
      ratio: number(),
      purchase_date: date(),
      currency: string(),
    })
  );
  
  export const stockSchema = object({
    name: string(),
    ticker: string(),
    quantity: number(),
    purchase_price: number(),
    ratio: number(),
    purchase_date: date(),
    currency: string(),
  });