import { createClient } from 'redis';

const redisClient = createClient({
    
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379
    }
}).on('connect', () => console.log('🚀 Redis Connecting...')).on("ready", () =>
{   console.log('✅ Redis Connected Successfully!')}).on('error', (err) => console.log('❌ Redis Connection Error', err));
    
await redisClient.connect();

export default redisClient;



