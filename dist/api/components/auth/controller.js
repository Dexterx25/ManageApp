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
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth = __importStar(require("../../../authorizations/index"));
const chalk_1 = __importDefault(require("chalk"));
function default_1(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/store');
    }
    let table2 = 'authentications';
    let table = 'admins';
    let procedence = '[CONTROLLER AUTH]';
    const insert = (email, password) => __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.redBright('start InsertLogin'), email, password);
        const data = yield store.query(table2, { email: email }, new Array(table));
        return bcrypt_1.default.compare(password, data.encrypted_password)
            .then((areEqual) => __awaiter(this, void 0, void 0, function* () {
            if (areEqual === true) {
                const token = yield auth.sign(data);
                console.log(`${procedence} ====> insertLogin - ${chalk_1.default.blueBright(data)}`);
                const dataUser = Object.assign(data, { encrypted_password: '' });
                return Object.assign({ token: token }, { dataUser });
            }
            else {
                return 'Invalid Password';
            }
        }))
            .catch((e) => e);
    });
    //user auth
    const upsert = (respon, data) => __awaiter(this, void 0, void 0, function* () {
        console.log('DATAS UPSERT ---->', data);
        const authData = {
            data: {
                admin_id: respon.id,
                encrypted_password: data.encrypted_password,
                email: data.email
            },
            type: 'insert_auth'
        };
        console.log(`${procedence} ====> upsertAuth authData body -> ${chalk_1.default.blueBright(data)}`);
        return store.upsert(table2, authData);
    });
    return {
        insert,
        upsert
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map