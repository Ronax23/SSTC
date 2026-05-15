import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379
    }
});

redisClient.on('connect', () => console.log('🚀 Redis Connecting...'));
redisClient.on('ready', () => console.log('✅ Redis Connected Successfully!'));
redisClient.on('error', (err) => console.error('❌ Redis Connection Error', err.message));

// Do not block server startup — Render needs the port open for health checks
redisClient.connect().catch((err) => {
    console.error('Redis initial connect failed:', err.message);
});

export default redisClient;



