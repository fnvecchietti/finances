import { Pagination } from "pagination";

export interface IncomeFilterableParams extends Pagination{
    id?: string;
    amount?:number;
    currency?: string;
    type?: string;
    description?: string;
    date?: Date;
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
}