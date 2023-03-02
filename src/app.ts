import authentication from './controllers/authentication';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import erp from './controllers/erp';
import express from 'express';
import helmet from 'helmet';
import log from './controllers/log';
import platform from './controllers/platform';
import receiveOT from './controllers/receiveOT';
import shipments from './controllers/shipments';
import tv from './controllers/tv';
import warehouse from './controllers/warehouse';
import workCenter from './controllers/workCenter';
import productivity from './controllers/productivity';
import painting from './controllers/painting';
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
app.use('/ReceiveOT', receiveOT);
app.use('/Shipments', shipments);
app.use('/TV', tv);
app.use('/Warehouse', warehouse);
app.use('/WorkCenters', workCenter);
app.use('/Productivity', productivity);
app.use('/Painting', painting);

// static
app.use(express.static(__dirname.replace('dist', 'public')));

// start server
app.listen(9070, () => {
    console.log('Start server...');
});