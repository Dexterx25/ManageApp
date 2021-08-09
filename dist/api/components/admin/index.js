"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { config } = require('../../../configurations/index');
let store, cache;
if (config.remoteDB === true) {
    store = require('../../../store/remote-postgres');
    cache = require('../../../store/remote-cache');
}
else {
    store = require('../../../store/postgres');
    cache = require('../../../store/redis');
}
const controller_1 = __importDefault(require("./controller"));
exports.default = controller_1.default(store, cache);
//# sourceMappingURL=index.js.map