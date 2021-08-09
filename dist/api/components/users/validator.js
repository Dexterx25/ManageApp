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
function Validator(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, pais, numero_identificacion, otros_nombres, tipo_identificacion } = data;
        let full_name = primer_nombre.concat(segundo_nombre).concat(primer_apellido).concat(segundo_apellido);
        if (primer_nombre.length || primer_apellido.length || segundo_apellido.length) {
            if (full_name) {
                if (primer_nombre.length > 20)
                    return 'El primer no debe ser mayor a 20 caracteres';
                if (segundo_nombre.length > 20)
                    return 'El segundo nombre no debe ser mayor a 20 caracteres';
                if (primer_apellido.length > 20)
                    return 'El primer apellido no debe ser mayor a 20 caracteres';
                if (segundo_apellido.length > 20)
                    return 'El segundo apellido no debe ser mayor a 20 caracteres';
                for (let i = 0; i < full_name.length; i++) {
                    const Character = full_name.charAt(i);
                    if (Character !== Character.toUpperCase()) {
                        return 'El nombre completo no debe contener "ñ" !';
                    }
                }
                function regexValidator(valor) {
                    console.log('vall-->', valor);
                    const patron = /[áéíóúñÑÄËÏÖÜÂÊÎÔÛáàèìòù]/;
                    const patron2 = /^[A-Z]+$/;
                    if (patron.test(valor) == true) {
                        console.log('error Acents');
                        return 'No se aceptan acentos';
                    }
                    else if (patron2.test(valor) == false) {
                        console.log('Error Alphabetic');
                        return 'Todas las letras deben ser del alfabeto';
                    }
                    else {
                        return '';
                    }
                }
                for (let i = 0; i < full_name.length; i++) {
                    const character = full_name.charAt(i);
                    const regex = yield regexValidator(character);
                    if (regex) {
                        return regex;
                    }
                }
            }
            else if (full_name.includes('ñ') || full_name.includes('Ñ')) {
                return 'El nombre completo no debe tener "ñ" ';
            }
            else {
                return '';
            }
        }
        else {
            return 'El primer nombre y el primer y segundo apellido deben llenarse';
        }
        if (pais == 'Colombia' || pais == 'Estados Unidos') {
            console.log('paisss-->', pais);
        }
        else {
            return "El país debe ser Colombia o Estados Unidos";
        }
        if (numero_identificacion) {
            if (numero_identificacion.length > 20)
                return 'El numero de identificación como maximo debe tener 20 caracteres';
            function verificationNumber(val) {
                const verifi1 = /^[A-Z]+$/i;
                const verifi2 = /^[0-9]+$/;
                const verifi3 = /[áéíóúñÑÄËÏÖÜÂÊÎÔÛáàèìòù]/;
                if (verifi1.test(val) == false || verifi2.test(val) == true || verifi3.test(val))
                    return 'El numero de identificacion debe estar entre A y Z mayusculas o minusculas y digitos del 0 al 9 y sin acentos ni "ñ"';
            }
            for (let i = 0; i < numero_identificacion.length; i++) {
                const character = numero_identificacion.charAt(i);
                const regexRes = yield verificationNumber(character);
                if (regexRes)
                    return regexRes;
            }
        }
        else {
            return 'Es obligatorio el numero de identificacion';
        }
        if (otros_nombres) {
            if (otros_nombres.length > 50)
                return 'Otros nombres debe ser maximo 50 caracteres';
            function regexValidate(val) {
                const validation1 = /^[A-Z]+$/;
                const validation2 = /[áéíóúñÑÄËÏÖÜÂÊÎÔÛáàèìòù]/;
                if (validation1.test(val) == false || validation2.test(val) == true) {
                    if (validation2.test(val) == true)
                        return 'No se permiten ni acentos ni "Ñ" para "Otros nombres"';
                    if (validation1.test(val) == false)
                        return 'Los valores de "Otros nombres" deben ser de A a la Z en mayusculas';
                }
            }
            for (let i = 0; i < otros_nombres.length; i++) {
                const character = otros_nombres.charAt(i);
                let responValidation = yield regexValidate(character);
                if (responValidation) {
                    return responValidation;
                }
            }
        }
        if (tipo_identificacion) {
            let conditions = ['C.C', 'C.E', 'PA', 'PE'];
            if (conditions.findIndex(e => e == tipo_identificacion) == -1) {
                return 'Solo se admite tipo de identificacion como \n Cedula de ciudadania "C.C", Cedula de Extranjeria "C.E", Pasaporte "PA" o Permiso especial "PE"';
            }
        }
        else {
            return 'Es necesario llenar el tipo de identificacion';
        }
    });
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map