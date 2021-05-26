import { Router } from 'express';
import { AuthController } from '../controllers/api/v1/AuthController';
import { CategoryController } from '../controllers/api/v1/CategoryController';
import { TodoController } from '../controllers/api/v1/TodoController';
import {catchErrors} from '../middlewares/Errors';
import { TodoValidator } from '../validators/TodoValidator';

const apiRouter = Router();

//DEFINE my Routes for todos
apiRouter.get('/api/v1/todos', AuthController.authorize, TodoController.findAll);
apiRouter.get('/api/v1/todos/:id', catchErrors(TodoController.findById));
apiRouter.post('/api/v1/todos', TodoValidator.getRules(), TodoValidator.validate, catchErrors(TodoController.create));
apiRouter.put('/api/v1/todos/:id', TodoValidator.getRules(), TodoValidator.validate, catchErrors(TodoController.update));
apiRouter.delete('/api/v1/todos/:id', catchErrors(TodoController.delete));



//DEFINE my Routes for categories
apiRouter.get('/api/v1/categories', CategoryController.findAll);
apiRouter.get('/api/v1/categories/:id', catchErrors(CategoryController.findById));
apiRouter.post('/api/v1/categories', TodoValidator.getRules(), TodoValidator.validate, catchErrors(CategoryController.create));
apiRouter.put('/api/v1/categories/:id', TodoValidator.getRules(), TodoValidator.validate, catchErrors(CategoryController.update));
apiRouter.delete('/api/v1/categories/:id', catchErrors(CategoryController.delete));




export {apiRouter};