import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Auth } from './Auth';

@Entity()
export class Stock extends BaseEntity {
    
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
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(()=> Auth, (auth)=> auth.username)
    createdBy: Auth;
}