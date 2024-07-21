export interface CreateMovementDto {
    amount: number;
    currency: string;
    date: Date;
    description: string;
    movement_type: string;
    created_by: string;
    wallet: string
}

export interface MovementItem {
    [k: string] : string | number | Date;
  }