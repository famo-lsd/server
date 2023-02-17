import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { checkToken } from '../utils/middleware';

const router = express.Router();

router.use(checkToken);

router.get('/TVChart', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Productivity/TVChart' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Indicators', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Productivity/Indicators' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/TVLabel', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Productivity/TVLabel' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/TVProductionOrders', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Productivity/TVProductionOrders' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/ProductionOrdersHistory', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Productivity/ProductionOrdersHistory' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});


export default router;