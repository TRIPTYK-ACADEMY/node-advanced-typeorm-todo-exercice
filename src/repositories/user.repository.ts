import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async exists(id : number) {
        const tableName = this.metadata.tableName;
        const articles = await this.query(
            `SELECT id FROM ${tableName} WHERE id=? LIMIT 1`,
            [id]
        );

        if (articles.length) {
            return true;
        }
        return false;
    }

    public async usersWithNoTodos() {
        const users = await this.find({
            relations : ['todos']
        });
        return users.filter((e) => e.todos?.length === 0);
    }
}