import axios from 'axios';
import express from 'express';
import Log from '../utils/log';
import { authorize } from '../utils/http';
import { createQueryString } from '../utils/general';
import { SHOPFLOOR_API } from '../utils/variablesRepo';
import { checkToken } from '../utils/middleware';

const router = express.Router();

router.use(checkToken);

router.get('/Boxes', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Boxes' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Inventories', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Inventories' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Inventories/Lines', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Inventories/Lines' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.patch('/Inventories/Lines', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'PATCH',
        url: SHOPFLOOR_API + 'api/Navision/Inventories/Lines' + createQueryString(req.query),
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

router.get('/Orders', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Orders' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Packages/Pending/Orders', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Packages/Pending/Orders' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Pallets', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Pallets' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.put('/Pallets', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'PUT',
        url: SHOPFLOOR_API + 'api/Navision/Pallets' + createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    })).then((result: any) => {
        res.send({ palletID: result.data });
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Pallets/Boxes', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Boxes' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.post('/Pallets/Close', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Close' + createQueryString(req.query),
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

router.post('/Pallets/Reopen', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Navision/Pallets/Reopen' + createQueryString(req.query),
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

router.get('/Shipments', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Shipments/Boxes', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Boxes' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.post('/Shipments/Boxes', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'POST',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Boxes' + createQueryString(req.query),
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

router.get('/Shipments/Products', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Products' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Shipments/Products/Components', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Shipments/Products/Components' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

router.get('/Warehouse/Pending/Orders', async (req: any, res: any) => {
    axios(await authorize(req, {
        method: 'GET',
        url: SHOPFLOOR_API + 'api/Navision/Warehouse/Pending/Orders' + createQueryString(req.query)
    })).then((result: any) => {
        res.send(result.data);
    }).catch((error: any) => {
        Log.promiseError(error);
        res.status(error.response.status).send(error.response.data);
    });
});

export default router;