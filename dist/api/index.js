"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const cors = require('cors');
const errors_1 = __importDefault(require("../utils/responses/errors"));
let { config } = require('../configurations/index');
const app = express_1.default();
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const network_1 = __importDefault(require("./components/users/network"));
const network_2 = __importDefault(require("./components/admin/network"));
const network_3 = __importDefault(require("./components/auth/network"));
app.use('/api/user', network_1.default);
app.use('/api/admin', network_2.default);
app.use('/api/auth', network_3.default);
app.use(errors_1.default);
app.listen(3000, () => {
    console.log(`Api Runing into ${config.api.host}:${config.api.port}`);
});
//# sourceMappingURL=index.js.map