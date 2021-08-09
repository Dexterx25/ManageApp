"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../../../utils/responses/index");
const index_2 = __importDefault(require("./index"));
const router = express_1.Router();
const chalk = require('chalk');
let procedence = '[NETWORK AUTH]';
router.post('/login', function (req, res, next) {
    index_2.default.insert(req.body.email, req.body.password)
        .then((token) => {
        if (!token) {
            index_1.ConsoleResponse.error(procedence, 'token Not Is Here');
            return next;
        }
        else {
            index_1.ConsoleResponse.success(procedence, token);
            index_1.ServerResponse.success(req, res, token, 201);
        }
    })
        .catch(next);
});
exports.default = router;
//# sourceMappingURL=network.js.map