export async function Validator (data?:any) {
 const {nikename, email,password, admin_type, avatar}  = data
 let thecase : string = '' 
 if(!nikename || !email)return thecase = 'datesIncompletes'
 if(nikename){
    function verificationNumber(val:any){
        console.log('datoAdmin nik-->', val)
        const verifi2 = /^[0-9 | A-Z]*$/i
        if(verifi2.test(val) == false){ 
            console.log('testing-->', verifi2.test(val))
            return 'formatInvalid'}
    }
    for (let i = 0; i < nikename.length; i++) {
        const character = nikename.charAt(i);
    const regexRes : any =  await verificationNumber(character)
     if(regexRes) return thecase = regexRes
    }
}
 if(password){
    if(password.length < 8)return 'La contraseña debe tener como minimo 8 caracteres';
 }else{
     return "Es necesario ingresar una contraseña"
 }
 switch (thecase) {
     case 'datesIncompletes':
         return "Datos de usuario administrador incompletos, debes llenar tanto nombre de usuario e email"
         break; 
     case 'formatInvalid':
         return "Los XD caracteres de nombre de usuario deben estar en el grupo del alfabeto en mayusculas o minusculas y aparte no debe contener 'Ñ' "
    
         default:

             break;
 }
 
}