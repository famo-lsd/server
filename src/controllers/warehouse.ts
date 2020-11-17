import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { verifyToken } from '../utils/middleware';

const router = express.Router();

router.use(verifyToken);

router.get('/Boxes', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Warehouse/Boxes' + createQueryString(req.query)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Bins', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Warehouse/Bins' + createQueryString(req.query)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Bins/Boxes', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + createQueryString(req.query)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.post('/Bins/Boxes', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.patch('/Bins/Boxes', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'PATCH',
        url: SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.delete('/Bins/Boxes', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'DELETE',
        url: SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Bins/Orders', async (req: any, res: any) => {
    axios((await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Warehouse/Bins/Orders' + createQueryString(req.query)
    }))).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;