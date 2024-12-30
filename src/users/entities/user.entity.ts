import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Photo } from "src/photos/entities/photo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    @Column()
    name: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    modifiedAt: Date;

    @OneToOne(() => Profile, (profile) => profile.user, {cascade: true})
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]
}