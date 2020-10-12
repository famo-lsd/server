import httpStatus from 'http-status';
import Log from './log';
import RedisAuth from './redisAuth';
import { refreshToken } from './http';

export async function verifyToken(req: any, res: any, next: Function) {
    try {
        const token = req.headers.origin ? req.session.token : (await RedisAuth.get()).Token;

        if (token) {
            const tokenExpirationDate = new Date(token['.expires']),
                currentDate = new Date(new Date().toUTCString());

            if (currentDate > tokenExpirationDate) {
                refreshToken(token).then(async (wsSucc: any) => {
                    if (req.headers.origin) {
                        req.session.token = wsSucc.data;
                    }
                    else {
                        const session = await RedisAuth.get();
                        session.Token = wsSucc.data;

                        await RedisAuth.set(session);
                    }
                    next();
                }).catch((wsErr: any) => {
                    Log.promiseError(wsErr);
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
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
        Log.error(err.message, err.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export function trackRequest(req: any, res: any, next: Function) {
    Log.tracking(req);
    next();
}