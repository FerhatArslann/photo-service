import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    gender: string;
    @Column()
    photo: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    modifiedAt: Date;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}