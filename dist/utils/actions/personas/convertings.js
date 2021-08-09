"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertingsId_type = void 0;
function ConvertingsId_type(tipo_identificacion, type) {
    let converterTypeId;
    if (type == 'register') {
        converterTypeId =
            tipo_identificacion == 'C.C' ? 1
                : tipo_identificacion == 'C.E' ? 2
                    : tipo_identificacion == 'PA' ? 3
                        : tipo_identificacion == 'PE' ? 4 : 0;
        return converterTypeId;
    }
    else if (type == 'list' || type == 'get') {
        tipo_identificacion == 1 ? converterTypeId = 'C.C'
            : tipo_identificacion == 2 ? converterTypeId = 'C.E'
                : tipo_identificacion == 3 ? converterTypeId = 'PA'
                    : tipo_identificacion == 4 ? converterTypeId = 'PE' : 0;
        return converterTypeId;
    }
}
exports.ConvertingsId_type = ConvertingsId_type;
//# sourceMappingURL=convertings.js.map