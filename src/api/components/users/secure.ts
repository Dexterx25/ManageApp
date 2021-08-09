import * as auth from '../../../authorizations/index'
import {Request,Response, NextFunction} from 'express'
export default function cheakAuth(action:any){
async function middleware (req:Request, res:Response, next:NextFunction){
       switch(action){
           case 'update':
               console.log('Update MIDLLLLLLLLLLEEEE')
            await auth.cheak.logged(req)
                next()
                break;
           case 'get':
                console.log('for getttt', req.headers)
            await  auth.cheak.logged(req)
                next()
                break;
           case 'list':
         await  auth.cheak.logged(req)
                next()
                break;
           case 'filter':
          await auth.cheak.logged(req)
                next()
           default:
                next();
       } 

   }
   return middleware;

}