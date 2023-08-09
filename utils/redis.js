import Redis from "ioredis";
console.log("okat?!!")
console.log("process.env.REDIS_CACHING", process.env.REDIS_CACHING);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
let redis;
if (process.env.NODE_ENV === "production") {
    console.log("IN PRODUCTION! process.env.REDIS_CACHING", process.env.REDIS_CACHING);
    redis = new Redis(process.env.REDIS_CACHING);
    console.log("REDIS CONNECTED IN PRODUCTION!");
} else {
    redis = new Redis();
}

export default redis;