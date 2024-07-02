export interface CreateMovementDto {
    username: string;
    amount: number;
    currency: string;
    date: Date;
    description: string;
    movementType: string;
}

export interface MovementItem {
    [k: string] : string | number | Date;
  }