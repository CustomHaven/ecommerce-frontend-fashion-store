import Redis from "ioredis";
let redis;
if (process.env.NODE_ENV === "production") {
    redis = new Redis(process.env.REDIS_CONNECTION_URL_STRING);
} else {
    redis = new Redis();
}

export default redis;