/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../../models/User';


class UserController {
    public static repository: Repository<User> | null = null;

    static create = async (req: Request, res: Response) => {
        const newUser = UserController.repository!.create(req.body);
        await UserController.repository!.save(newUser);
        return res.json({ user: newUser });
    };

    static findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserController.repository!.findOne(id);

        if (user === undefined) {
            throw new Error('User not found');
        }

        return res.json(user);
    };
    static findAll = async (req: Request, res: Response) => {
        const users = await UserController.repository!.find();
        return res.json({ users });
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserController.repository!.findOne(id, {
            relations: ['todos']
        });

        if (user === undefined) {
            throw new Error('User not found');
        }

        const mergedUser = UserController.repository!.merge(user, req.body);

        await UserController.repository!.save(mergedUser);

        return res.json(mergedUser);
    };
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserController.repository!.findOne(id);
        if (user === undefined) {
            throw new Error('User not found');
        }
        
        await UserController.repository!.remove(user);

        return res.json({
            status : 'success'
        });
    };
}

export { UserController };
