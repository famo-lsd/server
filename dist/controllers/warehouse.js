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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const log_1 = __importDefault(require("../utils/log"));
const http_1 = require("../utils/http");
const general_1 = require("../utils/general");
const variablesRepo_1 = require("../utils/variablesRepo");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
router.use(middleware_1.verifyToken);
router.get('/Boxes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default((yield http_1.authorize(req, {
        method: 'GET',
        url: variablesRepo_1.SHOPFLOOR_API + 'api/Warehouse/Boxes' + general_1.createQueryString(req.query)
    }))).then((wsSucc) => {
        res.send(wsSucc.data);
    }).catch((wsErr) => {
        log_1.default.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
}));
router.get('/Bins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default((yield http_1.authorize(req, {
        method: 'GET',
        url: variablesRepo_1.SHOPFLOOR_API + 'api/Warehouse/Bins' + general_1.createQueryString(req.query)
    }))).then((wsSucc) => {
        res.send(wsSucc.data);
    }).catch((wsErr) => {
        log_1.default.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
}));
router.get('/Bins/Boxes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default((yield http_1.authorize(req, {
        method: 'GET',
        url: variablesRepo_1.SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + general_1.createQueryString(req.query)
    }))).then((wsSucc) => {
        res.send(wsSucc.data);
    }).catch((wsErr) => {
        log_1.default.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
}));
router.post('/Bins/Boxes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default((yield http_1.authorize(req, {
        method: 'POST',
        url: variablesRepo_1.SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + general_1.createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }))).then((wsSucc) => {
        res.send(wsSucc.data);
    }).catch((wsErr) => {
        log_1.default.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
}));
router.patch('/Bins/Boxes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default((yield http_1.authorize(req, {
        method: 'PATCH',
        url: variablesRepo_1.SHOPFLOOR_API + 'api/Warehouse/Bins/Boxes' + general_1.createQueryString(req.query),
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(req.body)
    }))).then((wsSucc) => {
        res.send(wsSucc.data);
    }).catch((wsErr) => {
        log_1.default.promiseError(wsErr);
        res.status(wsErr.response.status).send(wsErr.response.data);
    });
}));
exports.default = router;
//# sourceMappingURL=warehouse.js.map