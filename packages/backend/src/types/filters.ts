import { Pagination } from 'pagination';

export interface MovementFilterableParams extends Pagination{
    id?: string;
    amount?:number;
    currency?: string;
    type?: string;
    description?: string;
    date?: Date;
    wallet?: string;
}


export interface StockFilterableParams extends Pagination{
    id?: string;
    name?:string;
    ticker?: string;
    quantity?: number;
    purchase_price?: number;
    ratio?: number;
    purchase_date?: Date;
    currency?: string;
    wallet?: string;
}