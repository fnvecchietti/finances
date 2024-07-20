import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Auth } from './auth';
import { Wallet } from './wallet';

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
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(()=> Auth, (auth)=> auth.id)
    created_by: Auth;

    @ManyToOne(()=> Wallet, (w)=> w.id)
    wallet:Wallet
}