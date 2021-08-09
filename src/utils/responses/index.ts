import { Router, Request, Response, NextFunction} from "express";
import chakl from "chalk"

export let ServerResponse = {
    success: function (req:Request, res:Response, message:string, status:number = 200) {
        let statusCode = status || 200;
        let statusMessage = message || '';
    
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    },

     error: function(req:any, res:any, message:any, status:any) {
         console.warn('Message--->', message, "status--->", status)
        let statusCode = status || 500;
        let statusMessage = message || 'Internal server error';

        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    }
}

export let ConsoleResponse = {
    error: function(message:any, procedence:string) {
         console.warn(`${chakl.red(`[Handle Fatal Error >>> (${procedence})] \n`)} ${chakl.magentaBright(`====> ${message}`)}`)
    },
    success : function(procedence:string, message:string){
         console.warn(`${chakl.green(`[Success Response >>> (${procedence})]  \n`)}${chakl.greenBright(`====> ${JSON.stringify(message)}`)}`)
    }

}
