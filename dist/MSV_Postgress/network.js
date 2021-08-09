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
const postgres_1 = __importDefault(require("../store/postgres"));
const index_1 = require("../utils/responses/index");
const router = express_1.Router();
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield postgres_1.default.list(req.params.table);
        index_1.ServerResponse.success(req, res, datos, 200);
    });
}
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield postgres_1.default.get(req.params.table, req.params.id);
        index_1.ServerResponse.success(req, res, datos, 200);
    });
}
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield postgres_1.default.insert(req.params.table, req.body);
        index_1.ServerResponse.success(req, res, datos, 200);
    });
}
function upsert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datos = yield postgres_1.default.upsert(req.params.table, req.body);
        index_1.ServerResponse.success(req, res, datos, 200);
    });
}
exports.default = router;
//# sourceMappingURL=network.js.map