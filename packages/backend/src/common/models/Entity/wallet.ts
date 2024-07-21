import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Auth } from './auth';
import { Movement } from './movements';


@Entity()
export class Wallet extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(()=> Auth, (auth)=> auth.id)
    created_by: Auth;

    @OneToMany(()=> Movement, (movement)=> movement.wallet)
    movements: Movement[]
}