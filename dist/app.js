"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("./controllers/authentication"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const erp_1 = __importDefault(require("./controllers/erp"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const log_1 = __importDefault(require("./controllers/log"));
const platform_1 = __importDefault(require("./controllers/platform"));
const redisAuth_1 = __importDefault(require("./utils/redisAuth"));
const shipments_1 = __importDefault(require("./controllers/shipments"));
const tv_1 = __importDefault(require("./controllers/tv"));
const warehouse_1 = __importDefault(require("./controllers/warehouse"));
const middleware_1 = require("./utils/middleware");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: true,
    credentials: true
}));
app.use(middleware_1.trackRequest);
app.use('/Authentication', authentication_1.default);
app.use('/ERP', erp_1.default);
app.use('/Log', log_1.default);
app.use('/Platform', platform_1.default);
app.use('/Shipments', shipments_1.default);
app.use('/TV', tv_1.default);
app.use('/Warehouse', warehouse_1.default);
app.use(express_1.default.static(__dirname.replace('dist', 'public')));
app.listen(9070, () => {
    console.log('Start server...');
});
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisAuth_1.default.cleanKeys();
}), 86400000);
//# sourceMappingURL=app.js.map