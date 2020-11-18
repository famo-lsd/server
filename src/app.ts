import authentication from './controllers/authentication';
import bodyParser from 'body-parser';
import compression from 'compression';
import connectRedis from 'connect-redis';
import cors from 'cors';
import erp from './controllers/erp';
import express from 'express';
import helmet from 'helmet';
import log from './controllers/log';
import platform from './controllers/platform';
import redis from 'redis';
import session from 'express-session';
import shipments from './controllers/shipments';
import uuidv4 from 'uuid/v4';
import warehouse from './controllers/warehouse';
import { MONTH_MS, SESSION_NAME } from './utils/variablesRepo';
import { trackRequest } from './utils/middleware';

// redis - session
const redisStore = connectRedis(session),
    redisClient = redis.createClient(3035, "localhost");

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

// session
app.use(session({
    store: new redisStore({
        client: redisClient,
        ttl: (MONTH_MS / 2) / 1000
    }),
    secret: 'famo_pda_session_sk',
    cookie: {
        httpOnly: true,
        maxAge: MONTH_MS / 2,
        sameSite: true,
        secure: false
    },
    genid: (req: any) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        return uuidv4();
    },
    name: SESSION_NAME,
    saveUninitialized: true,
    resave: true
}));

// access
app.use(trackRequest);

// routes
app.use('/Authentication', authentication);
app.use('/ERP', erp);
app.use('/Log', log);
app.use('/Platform', platform);
app.use('/Shipments', shipments);
app.use('/Warehouse', warehouse);

// static
app.use(express.static(__dirname.replace('dist', 'public')));

// start server
app.listen(9070, () => {
    console.log('Start server...');
});