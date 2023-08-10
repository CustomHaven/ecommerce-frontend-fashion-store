import Redis from "ioredis";
let redis;
if (process.env.NODE_ENV === "production") {
    redis = new Redis(process.env.REDIS_CACHING);
} else {
    redis = new Redis();
}

export default redis;