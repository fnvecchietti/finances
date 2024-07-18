import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Auth } from './auth';
import { Movement } from './movements';


@Entity()
export class Wallet extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'string', length: 255})
    name: string;

    @Column('float', {nullable: false})
    amount: number;

    @Column({type: 'varchar', length: 10})
    currency: string;

    @Column('date')
    date: Date;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(()=> Auth, (auth)=> auth.username)
    created_by: Auth;

    @ManyToMany(()=> Movement)
    @JoinTable()
    movements: Movement[]
}