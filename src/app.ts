import authentication from './controllers/authentication';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import erp from './controllers/erp';
import express from 'express';
import helmet from 'helmet';
import log from './controllers/log';
import platform from './controllers/platform';
import RedisAuth from './utils/redisAuth';
import shipments from './controllers/shipments';
import tv from './controllers/tv';
import warehouse from './controllers/warehouse';
import { trackRequest } from './utils/middleware';

// express
const app = express();

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// compression
app.use(compression());

// helmet
app.use(helmet());

// cors
app.use(cors({
    origin: true,
    credentials: true
}));

// access
app.use(trackRequest);

// routes
app.use('/Authentication', authentication);
app.use('/ERP', erp);
app.use('/Log', log);
app.use('/Platform', platform);
app.use('/Shipments', shipments);
app.use('/TV', tv);
app.use('/Warehouse', warehouse);

// static
app.use(express.static(__dirname.replace('dist', 'public')));

// start server
app.listen(9070, () => {
    console.log('Start server...');
});

// clean invalid keys (every day)
setInterval(async () => {
    await RedisAuth.cleanKeys();
}, 86400000);