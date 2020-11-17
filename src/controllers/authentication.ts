import axios from 'axios';
import express from 'express';
import httpStatus from 'http-status';
import Log from '../utils/log';
import querystring from 'querystring';
import RedisAuth from '../utils/redisAuth';
import { AUTH_SERVER, CODE_API, SESSION_NAME } from '../utils/variablesRepo';
import { verifyToken } from '../utils/middleware';

const router = express.Router();

function getAuthUser(accessToken: string, username: string) {
    return axios({
        method: 'POST',
        url: CODE_API + 'api/Authorization/PDA',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        data: {
            username: username
        }
    });
}

function signIn(req: any, res: any, username: string = null, password: string = null) {
    axios({
        method: 'POST',
        url: AUTH_SERVER + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            grant_type: 'password', // eslint-disable-line @typescript-eslint/camelcase
            username: !username ? req.body.username : username,
            password: !password ? req.body.password : password
        })
    }).then((tokenResult: any) => {
        getAuthUser(tokenResult.data.access_token, !username ? req.body.username : username).then(async (authUserResult: any) => {
            try {
                if (req.headers.origin) {
                    req.session.token = tokenResult.data;
                    req.session.authUser = authUserResult.data;

                    req.session.save();
                }
                else {
                    await RedisAuth.set({ Token: tokenResult.data, AuthUser: authUserResult.data });
                }

                res.send(authUserResult.data);
            }
            catch (error) {
                Log.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            }
        }).catch((authUserError: any) => {
            Log.promiseError(authUserError);
            res.status(authUserError.response ? authUserError.response.status : httpStatus.INTERNAL_SERVER_ERROR).send();
        });
    }).catch((tokenError: any) => {
        Log.promiseError(tokenError);
        res.status(tokenError.response ? tokenError.response.status : httpStatus.INTERNAL_SERVER_ERROR).send();
    });
}

router.post('/SignIn', (req: any, res: any) => {
    signIn(req, res);
});

router.get('/AutoSignIn', (req: any, res: any) => {
    signIn(req, res, 'nodejs', 'nodejs');
});

router.get('/SignOut', async (req: any, res: any) => {
    try {
        if (req.headers.origin) {
            const sessionID = req.sessionID;

            req.sessionStore.destroy(sessionID, (err: any) => {
                if (err) {
                    Log.error(err.message, err.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
                }
                else {
                    res.clearCookie(SESSION_NAME);
                    res.send();
                }
            });
        }
        else {
            await RedisAuth.del();
        }
    }
    catch (error) {
        Log.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/Session/User', verifyToken, async (req: any, res: any) => {
    try {
        const authUser = req.headers.origin ? req.session.authUser : (await RedisAuth.get()).AuthUser;

        if (authUser) {
            res.send(authUser);
        }
        else {
            res.status(httpStatus.NO_CONTENT).send();
        }
    }
    catch (err) {
        Log.error(err.message, err.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
});

export default router;