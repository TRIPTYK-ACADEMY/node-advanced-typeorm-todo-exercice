import { Router } from 'express';
import { AuthController } from '../controllers/api/v1/AuthController';
import {catchErrors} from '../middlewares/Errors';

const apiAuthRouter = Router();

//DEFINE my Routes for todos

apiAuthRouter.post('/api/v1/login', catchErrors(AuthController.login));
apiAuthRouter.post('/api/v1/check-token', catchErrors(AuthController.checkToken));

export {apiAuthRouter};