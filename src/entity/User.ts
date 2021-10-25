import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['user'])
export class User {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    user: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string):boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
