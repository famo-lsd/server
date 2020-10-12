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
const redis_1 = __importDefault(require("redis"));
const util_1 = __importDefault(require("util"));
const client = redis_1.default.createClient(3035, "localhost"), key = 'authentication', namespace = 'android:';
class RedisAuth {
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield (util_1.default.promisify(client.get).bind(client))(namespace + key);
            return value ? JSON.parse(value) : { Token: null, AuthUser: null };
        });
    }
    static set(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (util_1.default.promisify(client.set).bind(client))(namespace + key, JSON.stringify(value));
        });
    }
    static del() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (util_1.default.promisify(client.del).bind(client))(namespace + key);
        });
    }
}
exports.default = RedisAuth;
//# sourceMappingURL=redisAuth.js.map