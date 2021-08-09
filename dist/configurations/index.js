"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
exports.config = {
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.SECRET || "SECRETTOKEN"
    },
    database: {
        user: process.env.DB_USER_PSQL || 'developuser',
        host: process.env.DB_HOST_PSQL || 'localhost',
        database: process.env.DB_NAME || 'developdbpsql',
        password: process.env.DB_PASS || 'passcode',
        port: process.env.DB_PORT || 5432
    },
    MSV_PSQL: {
        host: process.env.DB_PSQL_HOST || 'localhost',
        port: process.env.PSQL_MSV || 3001
    },
    redis: {
        host: process.env.REDIS_SRV_HOST || '127.0.0.1',
        port: process.env.REDIS_SRV_PORT || 6379,
        //pasword: process.env.REDIS_SRV_PORT  || 'q6mUvhd8y7539z+yMGFnQetknyTPhmQvlgaIwrxDjKojljEjNhKQY72Tpmc2PyD02VbamA7B2GcPtyDar'
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3002,
    },
};
//# sourceMappingURL=index.js.map