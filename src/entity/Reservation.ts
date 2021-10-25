import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Trip } from "./Trip";
import { User } from "./User";

@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id_reservation: number;

    @Column()
    @IsNotEmpty()
    @ManyToMany(() => User)
    @JoinTable()
    id_user: number;

    @Column()
    @IsNotEmpty()
    @ManyToMany(() => Trip)
    @JoinTable()
    id_trip: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}