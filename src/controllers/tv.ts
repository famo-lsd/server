import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { checkToken } from '../utils/middleware';

const router = express.Router();

router.use(checkToken);

router.get('/Messages', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/TV/Messages' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/TVToBoxOrders', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/TV/TVToBoxOrders' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/TVWeekOrders', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/TV/TVWeekOrders' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;