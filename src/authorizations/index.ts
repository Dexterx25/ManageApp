import {config} from '../configurations/index'
import errors from '../utils/responses/errors'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import {decode} from 'jsonwebtoken'

const SECRET = config.jwt.secret;

export function sign(data:any){
 return   jwt.sign(data, SECRET)
}

export function verify (token:any){
  return jwt.verify(token, SECRET)
}

export const cheak : any = {
    own: function(req:any, owner:any){
     const decoded : any = decodeHeader(req);

    //VERIFY IF IS OWNER:
    if (decoded.id !== owner) {
        return {error:'Not is Owner', statusCode:400}
    }
 },

    logged: function(req:any, owner:any){
        try {
            const decoded = decodeHeader(req);
            console.log('DECODED LOGEDD---->', decoded)
            return {token_decoded:decoded};
        } catch (error) {
            errors(Object.assign(error, {statusCode:200}), 'xddd', 'addd')
            console.log('error LOGGED--->', console.log('ERROR LOG--->', error))
            return {error:error}
        }
    }
}

export function getToken(auth:any){ 
    if(!auth){
        return ({error:"Don`t bring Token", statusCode:401})
    }

    if(auth.indexOf("Bearer ") === -1){
        return ({error:"Formato inválido", statusCode:401})

    }

    let token = auth.replace("Bearer ", "");

    return token

}

export function decodeHeader(req:any){
    const {headers, token} = req
    const authorization = !headers ? token : headers.authorization || '';
    const thetoken = getToken(authorization)
    const decoded = verify(thetoken)

    req.user = decoded

 return decoded;
}

