import { ServerResponse, ConsoleResponse } from "./index";
import {Request, Response, NextFunction} from 'express'
 export default async function errors (err ?:any|any, req?:Request|any, res?:Response|any, next?:NextFunction|any){
    console.log('error Heere---!', err)   
    const message = err.msg || 'Error interno';
        const status = err.statusCode || 500;
      await ServerResponse.error(req, res, message, status);
    }
