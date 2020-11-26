import axios from 'axios';
import querystring from 'querystring';
import Redis from './redis';
import { AUTH_SERVER, NODE_TOKEN_PREFIX } from '../utils/variablesRepo';

export async function authorize(req: any, config: any) {
    if (!config.headers) {
        config.headers = {};
    }

    config.headers.Authorization = 'bearer ' + (await Redis.get(getNoken(req))).Data.Token.access_token; // eslint-disable-line @typescript-eslint/no-use-before-define
    return config;
}

export function getNoken(req: any) {
    return req.headers.authorization ? (req.headers.authorization as string).replace(NODE_TOKEN_PREFIX + ' ', '') : '';
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