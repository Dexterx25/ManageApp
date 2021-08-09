"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
function Validator(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nikename, email, password, admin_type, avatar } = data;
        let thecase = '';
        if (!nikename || !email)
            return thecase = 'datesIncompletes';
        if (nikename) {
            function verificationNumber(val) {
                console.log('datoAdmin nik-->', val);
                const verifi2 = /^[0-9 | A-Z]*$/i;
                if (verifi2.test(val) == false) {
                    console.log('testing-->', verifi2.test(val));
                    return 'formatInvalid';
                }
            }
            for (let i = 0; i < nikename.length; i++) {
                const character = nikename.charAt(i);
                const regexRes = yield verificationNumber(character);
                if (regexRes)
                    return thecase = regexRes;
            }
        }
        if (password) {
            if (password.length < 8)
                return 'La contraseña debe tener como minimo 8 caracteres';
        }
        else {
            return "Es necesario ingresar una contraseña";
        }
        switch (thecase) {
            case 'datesIncompletes':
                return "Datos de usuario administrador incompletos, debes llenar tanto nombre de usuario e email";
                break;
            case 'formatInvalid':
                return "Los XD caracteres de nombre de usuario deben estar en el grupo del alfabeto en mayusculas o minusculas y aparte no debe contener 'Ñ' ";
            default:
                break;
        }
    });
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map