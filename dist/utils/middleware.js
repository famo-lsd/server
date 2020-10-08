"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackRequest = exports.verifyToken = void 0;
const log_1 = __importDefault(require("./log"));
const http_status_1 = __importDefault(require("http-status"));
const http_1 = require("./http");
function verifyToken(req, res, next) {
    const token = req.session.token;
    if (token) {
        const tokenExpirationDate = new Date(token['.expires']), currentDate = new Date(new Date().toUTCString());
        if (currentDate > tokenExpirationDate) {
            http_1.refreshToken(token).then((wsSucc) => {
                req.session.token = wsSucc.data;
                next();
            }).catch((wsErr) => {
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
exports.verifyToken = verifyToken;
function trackRequest(req, res, next) {
    log_1.default.tracking(req);
    next();
}
exports.trackRequest = trackRequest;
//# sourceMappingURL=middleware.js.map