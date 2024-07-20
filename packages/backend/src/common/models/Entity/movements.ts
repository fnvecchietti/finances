import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovementType } from './movements-types';
import { Auth } from './auth';
import { Wallet } from './wallet';


@Entity()
export class Movement extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('float', {nullable: false})
    amount: number;

    @Column({type: 'varchar', length: 10})
    currency: string;

    @Column('date')
    date: Date;

    @Column({type: 'varchar', length: 255})
    description: string;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(()=> MovementType, (mt)=> mt.id)
    movement_type: MovementType;

    @ManyToOne(()=> Auth, (auth)=> auth.id)
    created_by: Auth;

    @ManyToOne(()=> Wallet, (w)=> w.movements)
    wallet:Wallet
}