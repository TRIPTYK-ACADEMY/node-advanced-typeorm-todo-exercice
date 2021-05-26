import { body } from 'express-validator';
import { BaseValidator } from './BaseValidator';

class TodoValidator extends BaseValidator{
    static getRules = () =>{
        return [
            body('title').isString().withMessage('You should not use numerics as title').notEmpty().withMessage('The field must be filled !')
        ];
    }
}
export {TodoValidator};