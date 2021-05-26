import { json } from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ErrorMiddleware } from './middlewares/Errors';
import { PassportConfig } from './middlewares/Passport';
import { apiRouter } from './routes/api.router';
import { apiAuthRouter } from './routes/auth.router';
import { apiUsersRouter } from './routes/user.router';

const app = express();

// app.use(helmet());
app.use(cors());
app.use(json());

//PASSPORT CONFIGURATION
app.use(PassportConfig.configure);
app.use(apiAuthRouter);
app.use(apiRouter);
app.use(apiUsersRouter);
//ERROR
//NotFOund
app.use(ErrorMiddleware.notFound);
//app error
app.use(ErrorMiddleware.appError);

export {app};

