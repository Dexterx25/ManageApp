"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../utils/actions/personas/index");
const mailValidator_1 = __importDefault(require("./mailValidator"));
const auth = __importStar(require("../../../authorizations/index"));
function default_1(injectedStore, injectedCache) {
    let cache = injectedCache;
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }
    let table = 'personas';
    let procedence = '[USER CONTROLLER]';
    const insert = (body) => __awaiter(this, void 0, void 0, function* () {
        const { datas, type, token } = body;
        console.warn('DATAS controller--->', datas, type);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const returnloged = auth.cheak.logged({ token: token });
            if (returnloged.error) {
                reject({ msg: 'Error de permisos de seguridad, token inválido', statusCode: 401 });
                return false;
            }
            const responValidator = yield index_1.Validator(datas);
            if (responValidator) {
                reject({ msg: responValidator });
                return false;
            }
            const converterTypeId = yield index_1.ConvertingsId_type(datas.tipo_identificacion, 'register');
            const body = {
                data: {
                    primer_nombre: datas.primer_nombre,
                    segundo_nombre: datas.segundo_nombre,
                    primer_apellido: datas.primer_apellido,
                    segundo_apellido: datas.segundo_apellido,
                    pais: datas.pais,
                    area: datas.area.toLowerCase().trim(),
                    date_int: datas.date_int,
                    numero_identificacion: datas.numero_identificacion,
                    tipo_identificacion: converterTypeId,
                    otros_nombres: datas.otros_nombres,
                    email: `${datas.primer_nombre.toLowerCase()}.${datas.primer_apellido.toLowerCase().replace(/ /g, "")}@devitech.com.co`
                },
                type: type
            };
            const { data } = body;
            yield mailValidator_1.default(data, reject, datas);
            store.upsert(table, body)
                .then((registerRespon) => __awaiter(this, void 0, void 0, function* () { return resolve(Object.assign(registerRespon, { tipo_identificacion: yield index_1.ConvertingsId_type(registerRespon.tipo_identificacion, 'register') })); }))
                .catch((e) => index_1.midlleHandleError(e, table, body, resolve, reject));
        }));
    });
    function list() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield cache.list(table);
            if (!users) {
                console.log('no estaba en cachee, buscando en db');
                users = yield store.list(table);
                console.log('users--->', users);
                cache.upsert(users, table);
            }
            else {
                console.log('datos traidos de la cache');
            }
            users = users.reduce((acc, item) => {
                acc.push({
                    id: item.id,
                    primer_nombre: item.primer_nombre,
                    segundo_nombre: item.segundo_nombre,
                    primer_apellido: item.primer_apellido,
                    otros_nombres: item.otros_nombres,
                    segundo_apellido: item.segundo_apellido,
                    enable_person: item.enable_person,
                    email: item.email,
                    pais: item.pais,
                    tipo_identificacion: index_1.ConvertingsId_type(item.tipo_identificacion, 'list'),
                    numero_identificacion: item.numero_identificacion,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    date_int: item.date_int,
                    area: item.area
                });
                return acc;
            }, []);
            users;
            return users;
        });
    }
    function get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const returnloged = auth.cheak.logged(data);
                if (returnloged.error) {
                    reject({ msg: 'Error de permisos de seguridad, token inválido', statusCode: 401 });
                    return false;
                }
                const { filter } = data;
                const theData = { type: 'getUser', querys: filter };
                console.log('the filter--->', filter);
                let user = yield cache.get(filter.id, table);
                if (!user) {
                    console.log('no estaba en cachee, buscando en db');
                    user = yield store.get(theData, table);
                    user = Object.assign(user, { tipo_identificacion: index_1.ConvertingsId_type(user.tipo_identificacion, 'get') });
                    cache.upsert(user, table);
                }
                resolve(user);
            }));
        });
    }
    function update(theBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const returnloged = auth.cheak.logged(theBody);
                if (returnloged.error) {
                    reject({ msg: 'Error de permisos de seguridad, token inválido', statusCode: 401 });
                    return false;
                }
                if (returnloged.token_decoded.admin_type !== '1') {
                    reject({ msg: "Solo el super administrador puede hacer cambios de los clientes", statusCode: 401 });
                    return false;
                }
                console.log('REturn logged chek', returnloged);
                const responValidator = yield index_1.Validator(theBody);
                if (responValidator) {
                    reject({ msg: responValidator });
                    return false;
                }
                const converterTypeId = yield index_1.ConvertingsId_type(theBody.tipo_identificacion, 'register');
                const filter = theBody;
                const theData = { type: 'getUser', querys: filter };
                const filterUser = yield store.get(theData, table);
                console.log('FILTER USER---->', filterUser);
                const body = {
                    data: {
                        id: filterUser.id,
                        primer_nombre: theBody.primer_nombre,
                        segundo_nombre: theBody.segundo_nombre,
                        primer_apellido: theBody.primer_apellido,
                        segundo_apellido: theBody.segundo_apellido,
                        pais: theBody.pais,
                        area: theBody.area,
                        enable_person: theBody.enable_person,
                        numero_identificacion: theBody.numero_identificacion,
                        tipo_identificacion: converterTypeId,
                        otros_nombres: theBody.otros_nombres,
                        email: filterUser.primer_nombre !== theBody.primer_nombre ||
                            filterUser.primer_apellido !== theBody.primer_apellido ?
                            `${theBody.primer_nombre.toLowerCase()}.${theBody.primer_apellido.toLowerCase().replace(/ /g, "")}@devitech.com.co`
                            : filterUser.email
                    },
                    type: 'update_user_forAdmin'
                };
                const { data } = body;
                yield mailValidator_1.default(data, reject, theBody);
                yield store.upsert(table, body)
                    .then((registerRespon) => __awaiter(this, void 0, void 0, function* () { return resolve(Object.assign(registerRespon, { tipo_identificacion: yield index_1.ConvertingsId_type(registerRespon.tipo_identificacion, 'get') })); }))
                    .catch((e) => index_1.midlleHandleError(e, table, body, resolve, reject));
            }));
        });
    }
    return {
        insert,
        list,
        get,
        update
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map