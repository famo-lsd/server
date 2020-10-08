import express from 'express';
import { ANDROID_APP_ID } from '../utils/variablesRepo';
import { verifyToken } from '../utils/middleware';

const router = express.Router();

router.use(verifyToken);

router.get('/Android', (req: any, res: any) => {
    const prop = 'x-requested-with';

    if (req.headers[prop] && req.headers[prop] === ANDROID_APP_ID) {
        res.send(true);
    }
    else {
        res.send(false);
    }
});

export default router;