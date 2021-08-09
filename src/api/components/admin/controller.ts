import bcrypt from "bcrypt"
import chalk  from "chalk"
import  controllerAuth from "../auth/index"
import {ServerResponse, ConsoleResponse} from "../../../utils/responses/index"
import {midlleHandleError, Validator} from "../../../utils/actions/admins/index"
import mailValidator from "./mailValidator"
import * as auth from '../../../authorizations/index'
export default function (injectedStore:any, injectedCache:any) {
    let cache = injectedCache
    let store = injectedStore

    if(!store ){
          store = require('../../../store/dummy')
    }
    if(!cache ){
        cache = require('../../../store/dummy')
    }
  let table = 'admins'
  let procedence = '[USER CONTROLLER]'

 const  insert = async ({datas, type}:any) => {
   console.warn('DATAS controller--->', datas, type)
      return new Promise(async(resolve, reject)=>{
      const responValidator = await Validator(datas)
       if(responValidator){
          reject({msg:responValidator});
          return false;
       }
     const body: object = {
      data:{
        nikename:datas.nikename,
        email:datas.email,
        admin_type:1,
        avatar:datas.avatar
        },
    type:type
   }
   const {data} : any = body
   await mailValidator(data, reject, datas)
try {
    const registerRespon: any = await store.upsert(table, body)
    console.log('REgisterRespon--->', registerRespon)
 const responAuth = await controllerAuth.upsert(registerRespon,{
    encrypted_password:await bcrypt.hash(datas.password, 5),
    id:registerRespon.id,
    email:registerRespon.email 
    })
    console.log('returning responAuth.--->', responAuth)
    
    const {email} = Object.assign(registerRespon, responAuth)
    console.log('email controller Auth-->', email)
    
   const res =  await controllerAuth.insert(email, datas.password)  
  resolve(res)
} catch (e:any) {
    console.log('error controll admin--->', e)
   await midlleHandleError(e, table, body, resolve, reject)

}
 
})

}
async function get(data:any){
    return new Promise( async (resolve, reject)=>{
          const {filter} = data
          const theData = {type:'getUser', querys:filter}
          console.log('the filter--->', filter)
          let user = await cache.get(filter.id, table)
            if(!user){
                console.log('no estaba en cachee, buscando en db')
                user = await store.get(theData, table)
                cache.upsert(user, table)
            }
         resolve(user)
    })

}
return {
  insert,
  get
}

}