import * as store from '../../../store/postgres'
import { FixingsErrors } from './index'
export async function midlleHandleError(e:any, table:string, data:any, resolve:any, reject:any) {
        try {
         //Fixing Email duplicated
          const list = await store.list(table)
          const responFix: any = await FixingsErrors(Object.assign(e, {list}), data)
           if(responFix){
            const newRespon =  await store.upsert(table, {data:responFix,type:data.type})
             resolve(newRespon);
         
           }

        } catch (error) {
            if(error.code == '23505' && error.constraint == 'uq_personas_identification' ){
                //Error identificación duplicada
                return reject({msg:'Numero de identificación registrado anteriormente, no se puede volver a registrar'})
            }
              reject(e)
             return false;  
        }
        
      
}