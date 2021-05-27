import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../../models/Category';

class CategoryController {
    static findAll= async (req:Request, res:Response) => {
        const allCategories = await getRepository(Category).find();
        return res.json({ categories: allCategories });
    }

    static create = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const newCategory = categoryRepository.create(req.body);
        await categoryRepository.save(newCategory);
        return res.json(newCategory);
    }

    static update = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const preloadedCategory = await categoryRepository.preload({
            id : parseInt(req.params.id),
            ...req.body
        });
        if (preloadedCategory === undefined) {
            throw new Error(`Category ${req.params.id} not found`);
        }
        await categoryRepository.save(preloadedCategory);
        return res.json(preloadedCategory);
    }

    static delete = async(req:Request, res:Response) => {
        const categoryRepository = getRepository(Category);
        const { id } = req.params;
        const { soft } = req.query;

        const categoryToDelete = await categoryRepository.findOne(id, {
            withDeleted : true // on inclus même ceux qui ont été soft delete
        });

        if (categoryToDelete === undefined) {
            throw new Error(`Category ${req.params.id} not found`);
        }

        if (soft) {
            // ?soft=true
            await categoryRepository.softRemove(categoryToDelete);
        } else {
            await categoryRepository.remove(categoryToDelete);
        }
        
        return res.json({
            status : soft ? 'soft deleted' : 'hard deleted'
        });
    }
    
    static findById = async(req:Request, res:Response) => {
        const {id} = req.params;
        const { withSoft } = req.query;

        const category = await getRepository(Category).findOne(id, {
            withDeleted: Boolean(withSoft)
        });

        if (category === undefined) {
            throw new Error(`Category ${req.params.id} not found`);
        }

        return res.json(category);
    }
}

export { CategoryController };
