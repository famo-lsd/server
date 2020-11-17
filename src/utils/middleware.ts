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
                refreshToken(token).then(async (result: any) => {
                    if (req.headers.origin) {
                        req.session.token = result.data;
                    }
                    else {
                        const session = await RedisAuth.get();
                        session.Token = result.data;

                        await RedisAuth.set(session);
                    }
                    next();
                }).catch((error: any) => {
                    Log.promiseError(error);
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
    catch (error) {
        Log.error(error.message, error.stack, { method: req.method, url: req.path, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export function trackRequest(req: any, res: any, next: Function) {
    Log.tracking(req);
    next();
}