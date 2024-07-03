import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovementType } from './MovementType';
import { Auth } from './Auth';


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
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(()=> MovementType, (mt)=> mt.type)
    movementType: MovementType;

    @ManyToOne(()=> Auth, (auth)=> auth.username)
    createdBy: Auth;
}