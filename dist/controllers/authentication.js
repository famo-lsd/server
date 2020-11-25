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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const log_1 = __importDefault(require("../utils/log"));
const querystring_1 = __importDefault(require("querystring"));
const redisAuth_1 = __importDefault(require("../utils/redisAuth"));
const v4_1 = __importDefault(require("uuid/v4"));
const variablesRepo_1 = require("../utils/variablesRepo");
const middleware_1 = require("../utils/middleware");
const http_1 = require("../utils/http");
const router = express_1.default.Router();
function getAuthUser(accessToken, username) {
    return axios_1.default({
        method: 'POST',
        url: variablesRepo_1.CODE_API + 'api/Authorization/PDA',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        data: {
            username: username
        }
    });
}
function signIn(req, res, username = null, password = null) {
    axios_1.default({
        method: 'POST',
        url: variablesRepo_1.AUTH_SERVER + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring_1.default.stringify({
            grant_type: 'password',
            username: !username ? req.body.username : username,
            password: !password ? req.body.password : password
        })
    }).then((tokenResult) => {
        getAuthUser(tokenResult.data.access_token, !username ? req.body.username : username).then((authUserResult) => __awaiter(this, void 0, void 0, function* () {
            try {
                const uuid = v4_1.default(), expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + (variablesRepo_1.MONTH_DAYS / 2));
                yield redisAuth_1.default.set(uuid, { Data: { AuthUser: authUserResult.data, Token: tokenResult.data }, ExpirationDate: expirationDate.toUTCString() });
                res.send({ AuthUser: authUserResult.data, Token: uuid });
            }
            catch (error) {
                log_1.default.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
                res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
            }
        })).catch((authUserError) => {
            log_1.default.promiseError(authUserError);
            res.status(authUserError.response ? authUserError.response.status : http_status_1.default.INTERNAL_SERVER_ERROR).send();
        });
    }).catch((tokenError) => {
        log_1.default.promiseError(tokenError);
        res.status(tokenError.response ? tokenError.response.status : http_status_1.default.INTERNAL_SERVER_ERROR).send();
    });
}
router.post('/SignIn', (req, res) => {
    signIn(req, res);
});
router.get('/AutoSignIn', (req, res) => {
    signIn(req, res, 'nodejs', 'nodejs');
});
router.get('/SignOut', middleware_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisAuth_1.default.del(http_1.getNoken(req));
    }
    catch (error) {
        log_1.default.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
    }
}));
router.get('/Session/User', middleware_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUser = (yield redisAuth_1.default.get(http_1.getNoken(req))).Data.AuthUser;
        if (authUser) {
            res.send(authUser);
        }
        else {
            res.status(http_status_1.default.NO_CONTENT).send();
        }
    }
    catch (err) {
        log_1.default.error(err.message, err.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
    }
}));
exports.default = router;
//# sourceMappingURL=authentication.js.map