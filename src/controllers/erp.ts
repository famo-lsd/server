import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { verifyToken } from '../utils/middleware';

const router = express.Router();

router.use(verifyToken);

router.get('/Boxes', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Boxes' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Inventories', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Inventories' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Inventories/Products', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Inventories/Products' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.patch('/Inventories/Products', (req: any, res: any) => {
    axios(authorize({
        method: 'PATCH',
        url: SHOPFLOOR_API + 'api/Navision/Inventories/Products' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Pallets', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Pallets' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Pallets/Boxes', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Boxes' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.put('/Pallets/Boxes', (req: any, res: any) => {
    axios(authorize({
        method: 'PUT',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Boxes' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }, req.session.token)).then((wsSucc: any) => {
        res.send({ palletID: wsSucc.data });
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.post('/Pallets/Close', (req: any, res: any) => {
    axios(authorize({
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Close' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.post('/Pallets/Reopen', (req: any, res: any) => {
    axios(authorize({
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Reopen' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Shipments', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Shipments/Products', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Products' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Shipments/Products/Components', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Products/Components' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.get('/Shipments/Boxes', (req: any, res: any) => {
    axios(authorize({
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Boxes' + createQueryString(req.query)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

router.post('/Shipments/Boxes', (req: any, res: any) => {
    axios(authorize({
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Boxes' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }, req.session.token)).then((wsSucc: any) => {
        res.send(wsSucc.data);
    }).catch((wsErr: any) => {
        Log.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
});

export default router;