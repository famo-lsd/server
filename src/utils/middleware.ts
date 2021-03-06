import _ from 'lodash';
import httpStatus from 'http-status';
import Log from './log';
import querystring from 'querystring';
import Redis from './redis';
import { getNoken, refreshToken } from './http';
import { MONTH_DAYS } from './variablesRepo';

export async function checkToken(req: any, res: any, next: Function) {
    try {
        if (req.headers.authorization) {
            const noken = getNoken(req),
                session = (await Redis.get(noken)),
                sessionExpirationDate = new Date(session.ExpirationDate),
                currentUtcDate = new Date(new Date().toUTCString());

            if (sessionExpirationDate > currentUtcDate) {
                const token = session.Data.Token;

                if (token) {
                    const newSessionExpirationDate = _.clone(sessionExpirationDate),
                        tokenExpirationDate = new Date(token['.expires']);

                    newSessionExpirationDate.setDate(currentUtcDate.getDate() + (MONTH_DAYS / 2));
                    session.ExpirationDate = newSessionExpirationDate.toUTCString();

                    if (currentUtcDate > tokenExpirationDate) {
                        refreshToken(token).then(async (result: any) => {
                            session.Data.Token = result.data;

                            await Redis.set(noken, session);
                            next();
                        }).catch((error: any) => {
                            Log.promiseError(error);
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
                        });
                    }
                    else {
                        await Redis.set(noken, session);
                        next();
                    }
                }
                else {
                    res.status(httpStatus.UNAUTHORIZED).send();
                }
            }
            else {
                res.status(httpStatus.UNAUTHORIZED).send();
            }
        }
        else {
            res.status(httpStatus.UNAUTHORIZED).send();
        }
    }
    catch (error) {
        Log.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export function trackRequest(req: any, res: any, next: Function) {
    const qs = querystring.parse(req.url);

    if (!((req.url as string).startsWith('/Warehouse/Bins/Orders?') && qs.binCode && qs.languageCode) && !((req.url as string).startsWith('/Warehouse/Bins?') && qs.code && qs.languageCode) && !(req.url as string).startsWith('/TV')) {
        Log.tracking(req);
    }

    next();
}