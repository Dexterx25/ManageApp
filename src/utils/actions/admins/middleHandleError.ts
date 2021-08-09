export async function midlleHandleError(error:any, table:string, data:any, resolve:any, reject:any) {
           if(error.code == '23505' && error.constraint == 'uq_admins_email'){
                return reject ({msg:'Corro electronico ya registrado, intente con otro'})
            }

}