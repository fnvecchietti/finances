import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Movements } from "./movements";


@Entity()
export class MovementType extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 255, unique: true})
    type: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @OneToMany(()=> Movements, (movements)=> movements.id)
    movements: Movements[]
}