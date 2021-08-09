import { Router, Request, Response, NextFunction} from "express";
import controller from "./index";
const {ServerResponse, ConsoleResponse} = require('../../../utils/responses/index')
import secure from './secure'
const router: Router = Router()
router.post('/register', upsert)
// router.post('/register/facebook', upsertFacebook)
// router.post('/register/ios', upsertIOS)
router.get('/', secure('get'), get)
router.get('/list',secure('list'), list)
router.put('/update', secure('update'),  update)
// router.get('/filter', secure('filter'), filter)
let procedence : string = "USER NETWORK"

async function upsert(req: Request, res: Response, next: NextFunction ) {
const datas: object = {
   type:'email_register',
   datas:req.body,
   token:req.headers.authorization
 }
 console.log('body--->', datas)
 await controller.insert(datas)
     .then((respon:any)=>{
        ConsoleResponse.success(procedence, respon)
        ServerResponse.success(req, res, respon, 200)
     })
     .catch(next)
     
}

async function get(req:Request, res:Response, next:NextFunction){
   const {filter} :any = req.query
   const data = {
     filter,
     token:req.headers.authorization
   }
   console.log('datass-->', data)
  
   controller.get(data).then((dataUser:any)=>{
       ConsoleResponse.success(procedence, dataUser)
       ServerResponse.success(req, res, dataUser, 200)
   })
   .catch(next)
}

async function list(req:Request, res:Response, next:NextFunction){

   const data :any = {
       type:req.body.type,
       datas:req.body, 
       token:req.headers.authorization
   } 
        controller.list() 
       .then((respon) => {
           ServerResponse.success(req, res, respon, 200)
       })
       .catch(next)
}

async function update (req:Request, res:Response, next:NextFunction){
   const data = {
       token:req.headers.authorization,
      }

controller.update(Object.assign(data, req.body)) 
  .then((datasAlter)=>{
    ServerResponse.success(req, res, datasAlter, 202)
   })
  
  .catch(next)
  
}
export default router