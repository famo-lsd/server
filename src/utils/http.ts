import axios from 'axios';
import querystring from 'querystring';
import RedisAuth from './redisAuth';
import { AUTH_SERVER } from '../utils/variablesRepo';

export async function authorize(req: any, reqOptions: any) {
    if (!reqOptions.headers) {
        reqOptions.headers = {};
    }

    reqOptions.headers.Authorization = 'bearer ' + (req.headers.origin ? req.session.token : (await RedisAuth.get()).Token).access_token;
    return reqOptions;
}

export function refreshToken(token: any) {
    return axios({
        method: 'POST',
        url: AUTH_SERVER + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            grant_type: 'refresh_token', // eslint-disable-line @typescript-eslint/camelcase
            refresh_token: token.refresh_token // eslint-disable-line @typescript-eslint/camelcase
        })
    });
}