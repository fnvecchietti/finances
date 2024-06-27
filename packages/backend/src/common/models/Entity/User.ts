import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auth } from "./Auth";


@Entity()
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    lastName: string;

    @Column('date')
    birthday: Date;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

}