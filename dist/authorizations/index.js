"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHeader = exports.getToken = exports.cheak = exports.verify = exports.sign = void 0;
const index_1 = require("../configurations/index");
const errors_1 = __importDefault(require("../utils/responses/errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = index_1.config.jwt.secret;
function sign(data) {
    return jsonwebtoken_1.default.sign(data, SECRET);
}
exports.sign = sign;
function verify(token) {
    return jsonwebtoken_1.default.verify(token, SECRET);
}
exports.verify = verify;
exports.cheak = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        //VERIFY IF IS OWNER:
        if (decoded.id !== owner) {
            return { error: 'Not is Owner', statusCode: 400 };
        }
    },
    logged: function (req, owner) {
        try {
            const decoded = decodeHeader(req);
            console.log('DECODED LOGEDD---->', decoded);
            return { token_decoded: decoded };
        }
        catch (error) {
            errors_1.default(Object.assign(error, { statusCode: 200 }), 'xddd', 'addd');
            console.log('error LOGGED--->', console.log('ERROR LOG--->', error));
            return { error: error };
        }
    }
};
function getToken(auth) {
    if (!auth) {
        return ({ error: "Don`t bring Token", statusCode: 401 });
    }
    if (auth.indexOf("Bearer ") === -1) {
        return ({ error: "Formato inválido", statusCode: 401 });
    }
    let token = auth.replace("Bearer ", "");
    return token;
}
exports.getToken = getToken;
function decodeHeader(req) {
    const { headers, token } = req;
    const authorization = !headers ? token : headers.authorization || '';
    const thetoken = getToken(authorization);
    const decoded = verify(thetoken);
    req.user = decoded;
    return decoded;
}
exports.decodeHeader = decodeHeader;
//# sourceMappingURL=index.js.map