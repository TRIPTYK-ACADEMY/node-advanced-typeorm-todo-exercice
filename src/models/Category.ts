import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Todo } from './Todo';

@Entity()
class Category extends BaseModel {
    @Column({
        nullable: false,
        unique: true
    })
    public title!:string;

    @ManyToMany(() => Todo, (todo) => todo.categories)
    public todos?: Todo[];
}

export{Category};