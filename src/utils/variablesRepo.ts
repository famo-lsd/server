export const ANDROID_APP_ID = 'famo.pda',
    AUTH_SERVER = process.env.NODE_ENV === 'production' ? 'http://dionisio.famo.pt:9060/FAMO.Authentication/' : 'http://localhost/FAMO.Authentication/',
    CODE_API = process.env.NODE_ENV === 'production' ? 'http://dionisio.famo.pt:9060/FAMO.CODE_API/' : 'http://localhost/FAMO.CODE_API/',
    LOG_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss.SSS',
    LOG_FOLDER = __dirname.replace('dist\\utils', 'log\\'),
    MONTH_MS = 2592000000,
    SHOPFLOOR_API = process.env.NODE_ENV === 'production' ? 'http://dionisio.famo.pt:9060/FAMO.ShopFloor_API/' : 'http://localhost/FAMO.ShopFloor_API/',
    SESSION_NAME = 'PDA_AUTH';