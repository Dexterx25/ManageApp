"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleResponse = exports.ServerResponse = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.ServerResponse = {
    success: function (req, res, message, status = 200) {
        let statusCode = status || 200;
        let statusMessage = message || '';
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    },
    error: function (req, res, message, status) {
        console.warn('Message--->', message, "status--->", status);
        let statusCode = status || 500;
        let statusMessage = message || 'Internal server error';
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: statusMessage,
        });
    }
};
exports.ConsoleResponse = {
    error: function (message, procedence) {
        console.warn(`${chalk_1.default.red(`[Handle Fatal Error >>> (${procedence})] \n`)} ${chalk_1.default.magentaBright(`====> ${message}`)}`);
    },
    success: function (procedence, message) {
        console.warn(`${chalk_1.default.green(`[Success Response >>> (${procedence})]  \n`)}${chalk_1.default.greenBright(`====> ${JSON.stringify(message)}`)}`);
    }
};
//# sourceMappingURL=index.js.map