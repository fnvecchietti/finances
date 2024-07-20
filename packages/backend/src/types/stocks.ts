

export interface createStockDTO {
    id?: string;
    name?:string;
    ticker?: string;
    quantity?: number;
    purchase_price?: number;
    ratio?: number;
    purchase_date?: Date;
    currency?: string;
    current_price?: number;
    wallet: string;
    created_by: string;
}

export interface StockItem {
    [k: string] : string | number | Date;
  }