import redis from 'redis';
import util from 'util';

interface RedisSession {
    Data: {
        AuthUser: any;
        Token: any;
    };
    ExpirationDate: string;
}

const client = redis.createClient(3035, "localhost"),
    namespace = 'node_session:';

export default class Redis {
    static async get(key: string): Promise<RedisSession> {
        const value = await (util.promisify(client.get).bind(client))(namespace + key);
        return value ? JSON.parse(value) : { Data: { AuthUser: null, Token: null }, ExpirationDate: new Date(-8640000000000000).toUTCString() };
    }

    static async set(key: string, value: RedisSession) {
        return await (util.promisify(client.set).bind(client))(namespace + key, JSON.stringify(value));
    }

    static async del(key: string) {
        return await (util.promisify(client.del).bind(client))(namespace + key);
    }

    static async cleanKeys() {
        const keys: Array<string> = await (util.promisify(client.keys).bind(client))('*'),
            currentUtcDate = new Date(new Date().toUTCString());

        keys.forEach(async x => {
            if (currentUtcDate > new Date((await this.get(x)).ExpirationDate)) {
                await this.del(x);
            }
        });
    }
}