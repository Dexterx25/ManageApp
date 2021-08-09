import { Router, Request, Response, NextFunction} from "express";
import controller from "./index";
const {ServerResponse, ConsoleResponse} = require('../../../utils/responses/index')
import secure from './secure'
const router: Router = Router()
router.post('/register', upsert)
// router.post('/register/facebook', upsertFacebook)
// router.post('/register/ios', upsertIOS)
 //router.get('/', secure('get'), get)
// router.get('/list',secure('list'), list)
// router.put('/update', secure('update'), upload.single('file'),  update)
// router.get('/filter', secure('filter'), filter)
let procedence : string = "USER NETWORK"

async function upsert(req: Request, res: Response, next: NextFunction ) {
const datas: object = {
   type:'email_register',
   datas:req.body,
 }
 console.log('body--->', req.body)
 await controller.insert(datas)
     .then((respon:any)=>{
        ConsoleResponse.success(procedence, respon)
        ServerResponse.success(req, res, respon, 200)
     })
     .catch(next)
     
}



export default router