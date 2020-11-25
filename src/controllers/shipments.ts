import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { checkToken } from '../utils/middleware';

const router = express.Router();

router.use(checkToken);

router.get('/Gates', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Shipments/Gates' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.put('/', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'PUT',
        url: SHOPFLOOR_API + 'api/Shipments' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;