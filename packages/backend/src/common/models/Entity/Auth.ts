import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Auth extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 50, unique: true})
    username: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @OneToOne(()=> Auth)
    user: Auth;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}