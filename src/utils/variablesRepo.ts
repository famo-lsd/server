export const ANDROID_APP_ID = 'famo.pda',
    AUTH_SERVER = process.env.NODE_ENV === 'production' ? 'http://dionisio.famo.pt:9050/FAMO.Authentication/' : 'http://localhost/FAMO.Authentication/',
    LOG_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss.SSS',
    LOG_FOLDER = __dirname.replace('dist\\utils', 'log\\'),
    MONTH_DAYS = 30,
    NODE_TOKEN_PREFIX = 'noken',
    SHOPFLOOR_API = process.env.NODE_ENV === 'production' ? 'http://dionisio.famo.pt:9055/FAMO.ShopFloor_API/' : 'http://localhost/FAMO.ShopFloor_API/';