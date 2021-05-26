import { body } from 'express-validator';
import { BaseValidator } from './BaseValidator';

class UserValidator extends BaseValidator{
    static getRules = () =>{
        return [
            body('email').isEmail().withMessage('You should not add an email')
        ];
    }
}
export {UserValidator};