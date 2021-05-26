import { getModelForClass } from '@typegoose/typegoose';
import { Request, response, Response } from 'express';
import { User } from '../../../models/User';


class UserController {
    static model = getModelForClass(User)

    static create = async(req:Request, res:Response) => {
        return res.json({user: await UserController.model.register(req.body, req.body.password)});
    }




    static update = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await UserController.model.updateOne({_id:id}, req.body));
    }
    static delete = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await UserController.model.deleteOne({_id:id}));
    }
    static findById = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await UserController.model.findOne({_id:id}));
    }
    static findAll= async (req:Request, res:Response) => {
        return res.json({users:await UserController.model.find({})});
     }
}

export {UserController};