export function FixingsErrors(error:any, {data, type}:any) {
    console.log('params fixings Errors-->', error, data)
    let fix : any
    let alter : any
    switch (error.code) {
        case '23505':
            if(error.list){
                const theId : number = error.list.filter((e :any) => e.primer_nombre == data.primer_nombre && e.primer_apellido == data.primer_apellido).length + 1
                alter = theId
            }  
          fix = data.email = `${data.primer_nombre.toLowerCase()}.${data.primer_apellido.toLowerCase().replace(/ /g, "")}${alter}@devitech.com.co`
          console.log('Fixing after --->', Object.assign(data, {email:fix}))
          return Object.assign(data, {email:fix})
        default:
        
            break;
    }
}