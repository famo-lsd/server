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
exports.trackRequest = exports.verifyToken = void 0;
const http_status_1 = __importDefault(require("http-status"));
const log_1 = __importDefault(require("./log"));
const redisAuth_1 = __importDefault(require("./redisAuth"));
const http_1 = require("./http");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.origin ? req.session.token : (yield redisAuth_1.default.get()).Token;
            if (token) {
                const tokenExpirationDate = new Date(token['.expires']), currentDate = new Date(new Date().toUTCString());
                if (currentDate > tokenExpirationDate) {
                    http_1.refreshToken(token).then((wsSucc) => __awaiter(this, void 0, void 0, function* () {
                        if (req.headers.origin) {
                            req.session.token = wsSucc.data;
                        }
                        else {
                            const session = yield redisAuth_1.default.get();
                            session.Token = wsSucc.data;
                            yield redisAuth_1.default.set(session);
                        }
                        next();
                    })).catch((wsErr) => {
                        log_1.default.promiseError(wsErr);
                        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
                    });
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }
        catch (err) {
            log_1.default.error(err.message, err.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
        }
    });
}
exports.verifyToken = verifyToken;
function trackRequest(req, res, next) {
    log_1.default.tracking(req);
    next();
}
exports.trackRequest = trackRequest;
//# sourceMappingURL=middleware.js.map