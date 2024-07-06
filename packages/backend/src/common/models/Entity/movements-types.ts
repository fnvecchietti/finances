import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Movement } from './movements';


@Entity()
export class MovementType extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 255, unique: true})
    type: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToMany(()=> Movement, (movements)=> movements.id)
    movements: Movement[];
}