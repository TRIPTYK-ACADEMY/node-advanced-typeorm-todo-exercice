import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../../models/User';
import {sign, verify} from 'jsonwebtoken';

class AuthController {
    static model = getModelForClass(User);
    static login = async (req:Request, res:Response, next:NextFunction)=>{
        const {user} = await AuthController.model.authenticate()(req.body.email, req.body.password);
        if(user){
            // eslint-disable-next-line no-console
            console.log(user);
            const jwtToken = await sign({
                exp:Math.floor(Date.now()/1000) +( 60* (parseInt(process.env.JWT_EXP || '1') )),
                data:user.id
            },
            process.env.JWT_SECRET || 'triptyk');
            // eslint-disable-next-line no-console
            console.log(jwtToken);
            return res.json(jwtToken);
        } 
            const err = new Error();
            err.message = 'Bad credentials';
            err.status=401;
            next(err);     
    }

    static authorize = async(req:Request, res:Response, next:NextFunction)=>{
    
        try{
            const jwtToken = req.headers.authorization?.split(' ')[1] || 'notoken';
            const userId = await verify(jwtToken, process.env.JWT_SECRET);
            next();
        }catch(e){
            const err = new Error('Bad token !!');
            err.status = 401;
            next(err);
            
        }
        //token no good err
    }
    
    static checkToken = async(req:Request, res:Response)=>{
    
        try{
            const jwtToken = req.headers.authorization?.split(' ')[1] || 'notoken';
            const userId = await verify(jwtToken, process.env.JWT_SECRET);
            return res.json({token:{isValid:true}});
        }catch(e){
            console.log('ok');
            return res.status(401).json({token:{isValid:false}});      
        }
        
    }

}

export {AuthController};