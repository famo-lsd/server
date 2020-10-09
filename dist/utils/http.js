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
exports.refreshToken = exports.authorize = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const variablesRepo_1 = require("../utils/variablesRepo");
const redis_1 = __importDefault(require("redis"));
const util_1 = __importDefault(require("util"));
const redisClient = redis_1.default.createClient(3035, "localhost");
function authorize(req, reqConfig, token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!reqConfig.headers) {
            reqConfig.headers = {};
        }
        if (req.headers.origin) {
            reqConfig.headers.Authorization = 'bearer ' + token.access_token;
            return reqConfig;
        }
        else {
            const func = util_1.default.promisify(redisClient.get).bind(redisClient);
            const value = yield func('androidToken');
            reqConfig.headers.Authorization = 'bearer ' + JSON.parse(value).access_token;
            return reqConfig;
        }
    });
}
exports.authorize = authorize;
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