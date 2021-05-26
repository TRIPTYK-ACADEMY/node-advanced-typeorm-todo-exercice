import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Todo } from './Todo';

@Entity()
class User extends BaseModel {
    @Column({
        nullable:false,
        unique:true
    })
    public email!:string;

    @OneToMany(() => Todo, (todo) => todo.user)
    public todos?: Todo[];
}

export{User};