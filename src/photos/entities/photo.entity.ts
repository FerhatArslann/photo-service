import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "src/categories/entities/category.entity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @ManyToOne(() => User, (user) => user.photos)
    user: User;

    @ManyToMany(() => Category, category => category.photos)
    @JoinTable({
        name: 'photo_categories_category',
        joinColumn: {
            name: 'photoId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id'
        }
    })
    categories: Category[];
}
