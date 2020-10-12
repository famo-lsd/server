import redis from 'redis';
import util from 'util';

interface RedisSession {
    Token: any;
    AuthUser: any;
}

const client = redis.createClient(3035, "localhost"),
    key = 'authentication',
    namespace = 'android:';

export default class RedisAuth {
    static async get(): Promise<RedisSession> {
        const value = await (util.promisify(client.get).bind(client))(namespace + key);
        return value ? JSON.parse(value) : { Token: null, AuthUser: null };
    }

    static async set(value: RedisSession) {
        return await (util.promisify(client.set).bind(client))(namespace + key, JSON.stringify(value));
    }

    static async del() {
        return await (util.promisify(client.del).bind(client))(namespace + key);
    }
}