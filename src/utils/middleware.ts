import Log from "./log";
import httpStatus from 'http-status';
import redis from 'redis';
import { refreshToken } from "./http";

const redisClient = redis.createClient(3035, "localhost");

export function verifyToken(req: any, res: any, next: Function) {
    if (req.headers.origin) {
        const token = req.session.token;

        if (token) {
            const tokenExpirationDate = new Date(token['.expires']),
                currentDate = new Date(new Date().toUTCString());

            if (currentDate > tokenExpirationDate) {
                refreshToken(token).then((wsSucc: any) => {
                    req.session.token = wsSucc.data;
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
    else {
        redisClient.get('androidToken', (err, data) => {
            const token = JSON.parse(data);

            if (token) {
                const tokenExpirationDate = new Date(token['.expires']),
                    currentDate = new Date(new Date().toUTCString());

                if (currentDate > tokenExpirationDate) {
                    refreshToken(token).then((wsSucc: any) => {
                        redisClient.set('androidToken', wsSucc.data);
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
        });
    }
}

export function trackRequest(req: any, res: any, next: Function) {
    Log.tracking(req);
    next();
}