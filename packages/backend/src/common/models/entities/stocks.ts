import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Stocks extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 20})
    name: string;

    @Column({type: 'varchar', length: 20})
    ticker: string;

    @Column('float', {nullable: false})
    quantity: number;

    @Column('float', {nullable: false})
    purchase_price: number;

    @Column('float', {nullable: false})
    current_price: number;

    @Column('integer')
    ratio: number;

    @Column('date')
    purchase_date: Date;
    
    @Column({type: 'varchar', length: 10})
    currency: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}