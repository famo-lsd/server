import axios from 'axios';
import querystring from 'querystring';
import { AUTH_SERVER } from '../utils/variablesRepo';

export function authorize(reqConfig: any, token: any) {
    if (!reqConfig.headers) {
        reqConfig.headers = {};
    }

    reqConfig.headers.Authorization = 'bearer ' + token.access_token;
    return reqConfig;
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