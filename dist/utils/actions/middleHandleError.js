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
Object.defineProperty(exports, "__esModule", { value: true });
exports.midlleHandleError = void 0;
const store = __importStar(require("../../store/postgres"));
const index_1 = require("./index");
function midlleHandleError(e, table, data, resolve, reject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Fixing Email duplicated
            const list = yield store.list(table);
            const responFix = yield index_1.FixingsErrors(Object.assign(e, { list }), data);
            if (responFix) {
                const newRespon = yield store.upsert(table, { data: responFix, type: data.type });
                resolve(newRespon);
            }
        }
        catch (error) {
            if (error.code == '23505' && error.constraint == 'uq_personas_identification') {
                //Error identificación duplicada
                return reject({ msg: 'Numero de identificación registrado anteriormente, no se puede volver a registrar' });
            }
            reject(e);
            return false;
        }
    });
}
exports.midlleHandleError = midlleHandleError;
//# sourceMappingURL=middleHandleError.js.map