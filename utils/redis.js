import Redis from "ioredis";
console.log("okat?!!")
console.log("process.env.REDIS_CACHING", process.env.REDIS_CACHING);
let redis;
if (process.env.NODE_ENV === "production") {
    redis = new Redis(process.env.REDIS_CACHING);
} else {
    redis = new Redis();
}

export default redis;