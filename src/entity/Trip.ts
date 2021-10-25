import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Trip {

    @PrimaryGeneratedColumn()
    id_trip: number;

    @Column()
    @IsNotEmpty()
    go_to: string;

    @Column()
    @IsNotEmpty()
    arrive_time: Date;

    @Column()
    @IsNotEmpty()
    out_time: Date;

    @Column()
    @IsNotEmpty()
    passengers: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}