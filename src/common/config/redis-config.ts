import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import configuration from "./configuration";

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    useFactory: async () => ({
        store: await redisStore({
            socket: {
                host: configuration().redis.host,
                port: configuration().redis.port
            },            
        }),
    }),
}