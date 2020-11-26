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
exports.refreshToken = exports.getNoken = exports.authorize = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const redis_1 = __importDefault(require("./redis"));
const variablesRepo_1 = require("../utils/variablesRepo");
function authorize(req, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = 'bearer ' + (yield redis_1.default.get(getNoken(req))).Data.Token.access_token;
        return config;
    });
}
exports.authorize = authorize;
function getNoken(req) {
    return req.headers.authorization ? req.headers.authorization.replace(variablesRepo_1.NODE_TOKEN_PREFIX + ' ', '') : '';
}
exports.getNoken = getNoken;
function refreshToken(token) {
    return axios_1.default({
        method: 'POST',
        url: variablesRepo_1.AUTH_SERVER + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring_1.default.stringify({
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token
        })
    });
}
exports.refreshToken = refreshToken;
//# sourceMappingURL=http.js.map