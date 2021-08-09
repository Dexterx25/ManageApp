"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixingsErrors = void 0;
function FixingsErrors(error, { data, type }) {
    console.log('params fixings Errors-->', error, data);
    let fix;
    let alter;
    switch (error.code) {
        case '23505':
            if (error.list) {
                const theId = error.list.filter((e) => e.primer_nombre == data.primer_nombre && e.primer_apellido == data.primer_apellido).length + 1;
                alter = theId;
            }
            fix = data.email = `${data.primer_nombre.toLowerCase()}.${data.primer_apellido.toLowerCase().replace(/ /g, "")}${alter}@devitech.com.co`;
            console.log('Fixing after --->', Object.assign(data, { email: fix }));
            return Object.assign(data, { email: fix });
        default:
            break;
    }
}
exports.FixingsErrors = FixingsErrors;
//# sourceMappingURL=fixingsErrors.js.map