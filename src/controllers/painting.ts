import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { checkToken } from '../utils/middleware';

const router = express.Router();

router.use(checkToken);

router.get('/TVChainItemQuantities', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Painting/TVChainItemQuantities' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/TVPaintingColor', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Painting/TVPaintingColor' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;