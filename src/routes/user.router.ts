import { Router } from 'express';
import { UserController } from '../controllers/api/v1/UserController';
import {catchErrors} from '../middlewares/Errors';
import { UserValidator } from '../validators/UserValidator';

const apiUsersRouter = Router();

//DEFINE my Routes for todos
apiUsersRouter.get('/api/v1/users', UserController.findAll);
apiUsersRouter.get('/api/v1/users/:id', catchErrors(UserController.findById));
apiUsersRouter.post('/api/v1/users', UserValidator.getRules(), UserValidator.validate, catchErrors(UserController.create));
apiUsersRouter.put('/api/v1/users/:id', UserValidator.getRules(), UserValidator.validate, catchErrors(UserController.update));
apiUsersRouter.delete('/api/v1/users/:id', catchErrors(UserController.delete));


export {apiUsersRouter};