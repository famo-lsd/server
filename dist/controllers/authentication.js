"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const log_1 = __importDefault(require("../utils/log"));
const querystring_1 = __importDefault(require("querystring"));
const redis_1 = __importDefault(require("redis"));
const variablesRepo_1 = require("../utils/variablesRepo");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router(), redisClient = redis_1.default.createClient(3035, "localhost");
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
    }).then((tokenRes) => {
        getAuthUser(tokenRes.data.access_token, !username ? req.body.username : username).then((authUserRes) => {
            if (req.headers.origin) {
                req.session.token = tokenRes.data;
                req.session.authUser = authUserRes.data;
                req.session.save();
            }
            else {
                redisClient.set('androidToken', JSON.stringify(tokenRes.data));
                redisClient.set('androidAuthUser', JSON.stringify(authUserRes.data));
            }
            res.send(authUserRes.data);
        }).catch((userErr) => {
            log_1.default.promiseError(userErr);
            res.status(userErr.response ? userErr.response.status : http_status_1.default.INTERNAL_SERVER_ERROR).send();
        });
    }).catch((tokenErr) => {
        log_1.default.promiseError(tokenErr);
        res.status(tokenErr.response ? tokenErr.response.status : http_status_1.default.INTERNAL_SERVER_ERROR).send();
    });
}
router.post('/SignIn', (req, res) => {
    signIn(req, res);
});
router.get('/AutoSignIn', (req, res) => {
    signIn(req, res, 'nodejs', 'nodejs');
});
router.get('/SignOut', (req, res) => {
    if (req.headers.origin) {
        const sessionID = req.sessionID;
        req.sessionStore.destroy(sessionID, (err) => {
            if (err) {
                log_1.default.error(err.message, err.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
                res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
            }
            else {
                res.clearCookie(variablesRepo_1.SESSION_NAME);
                res.send();
            }
        });
    }
    else {
        redisClient.set('androidToken', '');
        redisClient.set('androidAuthUser', '');
    }
});
router.get('/Session/User', middleware_1.verifyToken, (req, res) => {
    if (req.headers.origin) {
        const authUser = req.session.authUser;
        if (authUser) {
            res.send(authUser);
        }
        else {
            res.status(http_status_1.default.NO_CONTENT).send();
        }
    }
    else {
        redisClient.get('androidAuthUser', (err, data) => {
            const authUser = JSON.parse(data);
            if (authUser) {
                res.send(authUser);
            }
            else {
                res.status(http_status_1.default.NO_CONTENT).send();
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=authentication.js.map