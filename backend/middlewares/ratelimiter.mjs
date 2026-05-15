import redisClient from "../config/redisConnect.mjs";

const rateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const email = req.body.email;
    const ipKey = `limiter:ip:${ip}`;
    const emailKey = `limiter:email:${email}`;

    const IP_LIMIT = 50;
    const EMAIL_LIMIT = 20;
    const Lock_Time = 60 * 10; // 10 Minutes

    try {

        const [ipCount, emailCount] = await Promise.all([
            redisClient.get(ipKey),
            redisClient.get(emailKey)
        ]);

        if (ipCount && parseInt(ipCount) >= IP_LIMIT) {
            const timer = await redisClient.ttl(ipKey);
            return res.status(200).json({ message: `Too Many Attempts. Try after ${Math.ceil(timer / 60)} mins`, status: 429 });
        }

        if (email && emailCount && parseInt(emailCount) >= EMAIL_LIMIT) {
            const timer = await redisClient.ttl(emailKey);
            return res.status(200).json({ message: `Account Locked. Try after ${Math.ceil(timer / 60)} mins`, status: 429 });
        }

        const [newIpCount, newEmailCount] = await Promise.all([
            redisClient.incr(ipKey),
            email ? redisClient.incr(emailKey) : Promise.resolve(0)
        ]);

        if (newIpCount === IP_LIMIT + 1) {
            await redisClient.expire(ipKey, Lock_Time);
        }

        if (newEmailCount === EMAIL_LIMIT + 1) {
            await redisClient.expire(emailKey, Lock_Time);
        }

        next();
    } catch (error) {
        console.error("Lockout Error:", error);
        next();
    }
};

export const clearRateLimit = async (ip, email) => {
    const ipKey = `limiter:ip:${ip}`;
    const emailKey = `limiter:email:${email}`;
    await Promise.all([
        redisClient.del(ipKey),
        email ? redisClient.del(emailKey) : Promise.resolve()
    ]);
};

export default rateLimiter;