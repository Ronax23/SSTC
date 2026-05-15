import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379
    }
});

redisClient.on('connect', () => console.log('🚀 Redis Connecting...'));
redisClient.on('ready', () => console.log('✅ Redis Connected Successfully!'));
redisClient.on('error', (err) => console.error('❌ Redis Connection Error', err.message));

redisClient.connect().catch((err) => {
    console.error('Redis initial connect failed:', err.message);
});

export default redisClient;



