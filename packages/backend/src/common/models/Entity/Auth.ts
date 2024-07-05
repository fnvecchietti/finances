import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';


@Entity()
export class Auth extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length: 50, unique: true})
    username: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @OneToOne(()=> User)
    @JoinColumn()
    user:User;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}