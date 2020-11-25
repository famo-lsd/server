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
exports.trackRequest = exports.checkToken = void 0;
const lodash_1 = __importDefault(require("lodash"));
const http_status_1 = __importDefault(require("http-status"));
const log_1 = __importDefault(require("./log"));
const redisAuth_1 = __importDefault(require("./redisAuth"));
const http_1 = require("./http");
const variablesRepo_1 = require("./variablesRepo");
function checkToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.headers.authorization) {
                const noken = http_1.getNoken(req), session = (yield redisAuth_1.default.get(noken)), sessionExpirationDate = new Date(session.ExpirationDate), currentUtcDate = new Date(new Date().toUTCString());
                if (sessionExpirationDate > currentUtcDate) {
                    const token = session.Data.Token;
                    if (token) {
                        const newSessionExpirationDate = lodash_1.default.clone(sessionExpirationDate), tokenExpirationDate = new Date(token['.expires']);
                        newSessionExpirationDate.setDate(currentUtcDate.getDate() + (variablesRepo_1.MONTH_DAYS / 2));
                        session.ExpirationDate = newSessionExpirationDate.toUTCString();
                        if (currentUtcDate > tokenExpirationDate) {
                            http_1.refreshToken(token).then((result) => __awaiter(this, void 0, void 0, function* () {
                                session.Data.Token = result.data;
                                yield redisAuth_1.default.set(noken, session);
                                next();
                            })).catch((error) => {
                                log_1.default.promiseError(error);
                                res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
                            });
                        }
                        else {
                            yield redisAuth_1.default.set(noken, session);
                            next();
                        }
                    }
                    else {
                        res.status(http_status_1.default.UNAUTHORIZED).send();
                    }
                }
                else {
                    res.status(http_status_1.default.UNAUTHORIZED).send();
                }
            }
            else {
                res.status(http_status_1.default.UNAUTHORIZED).send();
            }
        }
        catch (error) {
            log_1.default.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
        }
    });
}
exports.checkToken = checkToken;
function trackRequest(req, res, next) {
    log_1.default.tracking(req);
    next();
}
exports.trackRequest = trackRequest;
//# sourceMappingURL=middleware.js.map