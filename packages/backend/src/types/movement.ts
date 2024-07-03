export interface CreateMovementDto {
    amount: number;
    currency: string;
    date: Date;
    description: string;
    movementType: string;
}

export interface MovementItem {
    [k: string] : string | number | Date;
  }