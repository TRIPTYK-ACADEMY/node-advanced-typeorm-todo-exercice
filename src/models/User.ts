import bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Todo } from './Todo';

@Entity()
class User extends BaseModel {
    @Column({
        nullable: false,
        unique: true
    })
    public email!: string;

    @Column({
        nullable: false,
        length: 1024,
        select : false
    })
    public password!: string;

    public verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    @BeforeInsert()
    async hashPassword() {
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
    }

    @OneToMany(() => Todo, (todo) => todo.user)
    public todos?: Todo[];
}

export { User };
