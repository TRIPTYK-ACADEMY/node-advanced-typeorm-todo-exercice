/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository, Repository } from 'typeorm';
import { Todo } from '../../../models/Todo';
import { User } from '../../../models/User';

class TodoController {
    static todoRepository: Repository<Todo> | null = null;
    static userRepository: Repository<User> | null = null;

    static init() {
        TodoController.todoRepository = getRepository(Todo);
        TodoController.userRepository = getRepository(User);
    }

    static findAll = async (req: Request, res: Response) => {
        const {data : userId} = verify(
            req.headers.authorization ? req.headers.authorization.split(' ')[1] : 'No auth',
            process.env.JWT_SECRET || 'Potato'
        ) as Record<string, any>;

        const queryBuilderForUser = TodoController.todoRepository!.createQueryBuilder(
            'todo'
        )
            .select()
            .leftJoinAndSelect('todo.categories', 'categories')
            .leftJoinAndSelect('todo.user', 'todo_user')
            .where('todo_user.id = :id_user', { id_user: userId });


        if (req.query.filterByCategory) {
            // on récupère les todos en fonction de l'utilisateur connecté et en filtrant par un certain type de catégorie
            const filteredTodos = await queryBuilderForUser
                .andWhere('categories.id = :category_id', {
                    category_id: req.query.filterByCategory
                 })
                .getMany();
            
            return res.json({ todos: filteredTodos });
        }

        return res.json({ todos: await queryBuilderForUser.getMany() });
    };

    static create = async (req: Request, res: Response) => {
        // const todo:Todo = new TodoController.model(req.body);
         const { data: tokenUserId } = verify(
             req.headers.authorization
                 ? req.headers.authorization.split(' ')[1]
                 : 'No auth',
             process.env.JWT_SECRET || 'Potato'
         ) as Record<string, any>;

        const user = await TodoController.userRepository!.findOne(tokenUserId);
        req.body.user = user;
        // req.body.categories = req.body.categories.map((e: string) => {return {id : e};});
        // [1,2]
        // [{ id : 1},{id  : 2}]
        req.body.categories = await TodoController.todoRepository!.findByIds(req.body.categories);

        const newTodo = TodoController.todoRepository!.create(req.body as Record<string, any>);

        await TodoController.todoRepository!.save(newTodo);
        return res.json(newTodo);
    };
    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const todo = await TodoController.todoRepository!.findOne(id);

        if (todo === undefined) {
            throw new Error('Todo not found');
        }

        const mergedUser = TodoController.todoRepository!.merge(todo, req.body);

        await TodoController.todoRepository!.save(mergedUser);

        return res.json(mergedUser);
    };
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await TodoController.todoRepository!.findOne(id);
        if (user === undefined) {
            throw new Error('Todo not found');
        }

        await TodoController.todoRepository!.remove(user);

        return res.json({
            status: 'success'
        });
    };
    static findById = async (req: Request, res: Response) => {
        const { id } = req.params;

        const todo = await TodoController.todoRepository!.findOne(id);

        if (todo === undefined) {
            throw new Error(`Todo ${req.params.id} not found`);
        }

        return res.json(todo);
    };
}

export { TodoController };
