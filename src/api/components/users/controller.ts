import bcrypt from "bcrypt"
import chalk  from "chalk"
import  controllerAuth from "../auth/index"
import {ServerResponse, ConsoleResponse} from "../../../utils/responses/index"
import {midlleHandleError, Validator, ConvertingsId_type} from "../../../utils/actions/personas/index"
import mailValidator from "./mailValidator"
import * as auth from "../../../authorizations/index"
export default function (injectedStore:any, injectedCache:any) {
    let cache = injectedCache
    let store = injectedStore

    if(!store ){
          store = require('../../../store/dummy')
    }
    if(!cache ){
        cache = require('../../../store/dummy')
    }
  let table = 'personas'
  let procedence = '[USER CONTROLLER]'

const  insert = async (body:any) => {
  const {datas, type, token}:any = body
   console.warn('DATAS controller--->', datas, type)
      return new Promise(async(resolve, reject)=>{
  const returnloged = auth.cheak.logged({token:token})
   if(returnloged.error){
    reject({msg:'Error de permisos de seguridad, token inválido', statusCode:401});
    return false;
   }
      const responValidator = await Validator(datas)
       if(responValidator){
          reject({msg:responValidator});
          return false;
       }
     const converterTypeId : any = await ConvertingsId_type(datas.tipo_identificacion, 'register')
     const body: object = {
      data:{
        primer_nombre:datas.primer_nombre,
        segundo_nombre:datas.segundo_nombre,
        primer_apellido:datas.primer_apellido,
        segundo_apellido:datas.segundo_apellido,
        pais:datas.pais,
        area:datas.area.toLowerCase().trim(),
        date_int:datas.date_int,
        numero_identificacion:datas.numero_identificacion,
        tipo_identificacion:converterTypeId,
        otros_nombres:datas.otros_nombres,
        email:`${datas.primer_nombre.toLowerCase()}.${datas.primer_apellido.toLowerCase().replace(/ /g, "")}@devitech.com.co`
      },
    type:type
   }
   const {data} : any = body
   await mailValidator(data, reject, datas)

 store.upsert(table, body)
 .then(async(registerRespon :any) => resolve(Object.assign(registerRespon, {tipo_identificacion:await ConvertingsId_type(registerRespon.tipo_identificacion, 'register')})))
 .catch((e:any) => midlleHandleError(e, table, body, resolve, reject))
  
})

}
async function list(){ 
  let users  = await cache.list(table)
     if(!users){
     console.log('no estaba en cachee, buscando en db')
        users = await store.list(table)
        console.log('users--->', users)
         
           cache.upsert(users, table)
     }else{
        console.log('datos traidos de la cache')
     }
      
       users = users.reduce((acc:any, item:any) =>{
            acc.push({
              id:item.id,
              primer_nombre:item.primer_nombre,
              segundo_nombre:item.segundo_nombre,
              primer_apellido:item.primer_apellido,
              otros_nombres:item.otros_nombres,
              segundo_apellido:item.segundo_apellido,
              enable_person:item.enable_person,
              email:item.email,
              pais:item.pais,
              tipo_identificacion:ConvertingsId_type(item.tipo_identificacion, 'list'),
              numero_identificacion:item.numero_identificacion,
              created_at:item.created_at,
              updated_at:item.updated_at,
              date_int:item.date_int,
              area:item.area
            })
        return acc
       },[])
              
      users 
 return users
}
async function get(data:any){
  return new Promise( async (resolve, reject)=>{
    const returnloged = auth.cheak.logged(data)
    if(returnloged.error){
     reject({msg:'Error de permisos de seguridad, token inválido', statusCode:401});
     return false;
    }
        const {filter} = data
        const theData = {type:'getUser', querys:filter}
        console.log('the filter--->', filter)
        let user :any = await cache.get(filter.id, table)
          if(!user){
              console.log('no estaba en cachee, buscando en db')
              user = await store.get(theData, table)
              
              user = Object.assign(user, {tipo_identificacion:ConvertingsId_type(user.tipo_identificacion, 'get')})
              cache.upsert(user, table)
          }
       resolve(user)
  })

}
async function update(theBody:any){

  return new Promise (async(resolve, reject) =>{
   const returnloged = auth.cheak.logged(theBody)
   if(returnloged.error){
    reject({msg:'Error de permisos de seguridad, token inválido', statusCode:401});
    return false;
   }
   
   if(returnloged.token_decoded.admin_type !== '1'){
      reject({msg:"Solo el super administrador puede hacer cambios de los clientes", statusCode:401})
      return false;
   }

     console.log('REturn logged chek', returnloged)
    const responValidator = await Validator(theBody)
    if(responValidator){
       reject({msg:responValidator});
       return false;
    }
    
    const converterTypeId : number = await ConvertingsId_type(theBody.tipo_identificacion, 'register')
   const filter = theBody;
    const theData = {type:'getUser', querys:filter}
    const filterUser = await store.get(theData, table)
    console.log('FILTER USER---->', filterUser)
    const body: any = {
     data:{
       id:filterUser.id,
       primer_nombre:theBody.primer_nombre,
       segundo_nombre:theBody.segundo_nombre,
       primer_apellido:theBody.primer_apellido,
       segundo_apellido:theBody.segundo_apellido,
       pais:theBody.pais,
       area:theBody.area,
       enable_person:theBody.enable_person,
       numero_identificacion:theBody.numero_identificacion,
       tipo_identificacion:converterTypeId,
       otros_nombres:theBody.otros_nombres,
       email:filterUser.primer_nombre !== theBody.primer_nombre ||
        filterUser.primer_apellido !== theBody.primer_apellido ? 
        `${theBody.primer_nombre.toLowerCase()}.${theBody.primer_apellido.toLowerCase().replace(/ /g, "")}@devitech.com.co` 
        : filterUser.email
     },
   type:'update_user_forAdmin'
  }
  const {data} : any = body
  await mailValidator(data, reject, theBody)
  await store.upsert(table, body)
.then(async(registerRespon :any) => resolve(Object.assign(registerRespon, {tipo_identificacion:await ConvertingsId_type(registerRespon.tipo_identificacion, 'get')})))
.catch((e:any) => midlleHandleError(e, table, body, resolve, reject))
   })
}
return {
  insert,
  list,
  get,
  update
}

}