import { NextFunction, Request, Response } from 'express';

class ErrorMiddleware{
    static notFound = (req:Request, res:Response, next:NextFunction)=>{
        const err = new Error();
        err.message = 'Not Found';
        err.status = 404;
        next(err);
    }

    static appError = (err:any, req:Request, res:Response, next: NextFunction) =>{
        res.status(err.status || 500);
        // eslint-disable-next-line no-console
        console.log(err);
        res.json({error:{
            message:err.message
        }});
    }
}
const catchErrors = (fn:any)=>{
    return function(req:Request, res:Response, next: NextFunction){
        return fn(req, res, next).catch(next);
    };
};

export {ErrorMiddleware, catchErrors};