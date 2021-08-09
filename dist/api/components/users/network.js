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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./index"));
const { ServerResponse, ConsoleResponse } = require('../../../utils/responses/index');
const secure_1 = __importDefault(require("./secure"));
const router = express_1.Router();
router.post('/register', upsert);
// router.post('/register/facebook', upsertFacebook)
// router.post('/register/ios', upsertIOS)
router.get('/', secure_1.default('get'), get);
router.get('/list', secure_1.default('list'), list);
router.put('/update', secure_1.default('update'), update);
// router.get('/filter', secure('filter'), filter)
let procedence = "USER NETWORK";
function upsert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datas = {
            type: 'email_register',
            datas: req.body,
            token: req.headers.authorization
        };
        console.log('body--->', datas);
        yield index_1.default.insert(datas)
            .then((respon) => {
            ConsoleResponse.success(procedence, respon);
            ServerResponse.success(req, res, respon, 200);
        })
            .catch(next);
    });
}
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filter } = req.query;
        const data = {
            filter,
            token: req.headers.authorization
        };
        console.log('datass-->', data);
        index_1.default.get(data).then((dataUser) => {
            ConsoleResponse.success(procedence, dataUser);
            ServerResponse.success(req, res, dataUser, 200);
        })
            .catch(next);
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            type: req.body.type,
            datas: req.body,
            token: req.headers.authorization
        };
        index_1.default.list()
            .then((respon) => {
            ServerResponse.success(req, res, respon, 200);
        })
            .catch(next);
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            token: req.headers.authorization,
        };
        index_1.default.update(Object.assign(data, req.body))
            .then((datasAlter) => {
            ServerResponse.success(req, res, datasAlter, 202);
        })
            .catch(next);
    });
}
exports.default = router;
//# sourceMappingURL=network.js.map