import axios from 'axios';
import express from 'express';
import httpStatus from 'http-status';
import Log from '../utils/log';
import querystring from 'querystring';
import Redis from '../utils/redis';
import uuidv4 from 'uuid/v4';
import { AUTH_SERVER, CODE_API, MONTH_DAYS } from '../utils/variablesRepo';
import { checkToken } from '../utils/middleware';
import { getNoken } from '../utils/http';

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
                const uuid = uuidv4(),
                    expirationDate = new Date();

                expirationDate.setDate(expirationDate.getDate() + (MONTH_DAYS / 2));
                await Redis.set(uuid, { Data: { AuthUser: authUserResult.data, Token: tokenResult.data }, ExpirationDate: expirationDate.toUTCString() });

                res.send({ AuthUser: authUserResult.data, Token: uuid });
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

router.get('/SignOut', checkToken, async (req: any, res: any) => {
    try {
        await Redis.del(getNoken(req));
    }
    catch (error) {
        Log.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/Session/User', checkToken, async (req: any, res: any) => {
    try {
        const authUser = (await Redis.get(getNoken(req))).Data.AuthUser;

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