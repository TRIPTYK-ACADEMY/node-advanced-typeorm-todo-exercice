import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models/User';

class PassportConfig {
    static model = getModelForClass(User)
    static configure = (req:Request, res:Response, next:NextFunction) =>{
      passport.initialize();
      passport.use(PassportConfig.model.createStrategy());
      next();
    }
}

export {PassportConfig};