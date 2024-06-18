import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    lastName: string;

    @Column({type: 'varchar', length: 50, unique: true})
    username: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @Column('date')
    birthday: Date;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

}