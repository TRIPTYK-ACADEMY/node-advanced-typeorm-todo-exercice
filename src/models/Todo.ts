import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { Category } from './Category';
import { User } from './User';

@Entity()
class Todo extends BaseModel {
    @Column({
        nullable: false,
        unique: true
    })
    public title!: string;

    @Column('text')
    public description?: string;

    @ManyToMany(() => Category, (category) => category.todos)
    @JoinTable()
    public categories?: Category[];

    @ManyToOne(() => User, (user) => user.todos)
    public user?: User;
}

export { Todo };
