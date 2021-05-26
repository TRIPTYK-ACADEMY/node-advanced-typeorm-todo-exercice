import { getModelForClass } from '@typegoose/typegoose';
import { Request, response, Response } from 'express';
import { Category } from '../../../models/Category';

class CategoryController {
    static model = getModelForClass(Category);
    static findAll= async (req:Request, res:Response) => {
       return res.json({categories:await CategoryController.model.find()});
    }

    static create = async(req:Request, res:Response) => {
        return res.json(await CategoryController.model.create(req.body));
    }
    static update = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await CategoryController.model.updateOne({_id:id}, req.body));
    }
    static delete = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await CategoryController.model.deleteOne({_id:id}));
    }
    static findById = async(req:Request, res:Response) => {
        const {id} = req.params;
        return res.json(await CategoryController.model.findOne({_id:id}));
    }
}

export {CategoryController};