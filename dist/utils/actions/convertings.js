"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertingsId_type = void 0;
function ConvertingsId_type(tipo_identificacion) {
    let converterTypeId = tipo_identificacion == 'C.C' ? 1
        : tipo_identificacion == 'C.E' ? 2
            : tipo_identificacion == 'PA' ? 3
                : tipo_identificacion == 'PE' ? 4 : 0;
    return converterTypeId;
}
exports.ConvertingsId_type = ConvertingsId_type;
//# sourceMappingURL=convertings.js.map