

export interface createStockDTO {
    id?: string;
    name?:string;
    ticker?: string;
    quantity?: number;
    purchase_price?: number;
    ratio?: number;
    purchase_date?: Date;
    currency?: string;
}

export interface StockItem {
    [k: string] : string | number | Date;
  }