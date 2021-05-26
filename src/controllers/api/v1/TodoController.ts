import { getModelForClass } from '@typegoose/typegoose';
import { Request, response, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Todo } from '../../../models/Todo';
import { User } from '../../../models/User';


class TodoController {
    static model = getModelForClass(Todo);
    static userModel = getModelForClass(User);
    static findAll= async (req:Request, res:Response) => {
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user =await TodoController.userModel.findById(tokenUserId);
        if(req.query.filterByCategory){
            return res.json({todos:await TodoController.model.find({user, category:req.query.filterByCategory}).populate('category')});
        }
       return res.json({todos:await TodoController.model.find({user}).populate('category')});
    }

    static create = async(req:Request, res:Response) => {
        // const todo:Todo = new TodoController.model(req.body);
        const tokenUserId = verify(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).data;
        const user =await TodoController.userModel.findById(tokenUserId);
        req.body.user=user;
        return res.json(await TodoController.model.create(req.body));
    }
    static update = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await TodoController.model.updateOne({_id:id}, req.body));
    }
    static delete = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await TodoController.model.deleteOne({_id:id}));
    }
    static findById = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await TodoController.model.findOne({_id:id}));
    }
}

export {TodoController};