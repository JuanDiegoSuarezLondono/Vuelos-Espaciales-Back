import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Trip } from "./Trip";
import { User } from "./User";

@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id_reservation: number;

    @Column()
    @IsNotEmpty()
    @OneToOne(type => User) @JoinColumn() 
    id_user: number;

    @Column()
    @IsNotEmpty()
    @OneToOne(type => Trip) @JoinColumn() 
    id_trip: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}