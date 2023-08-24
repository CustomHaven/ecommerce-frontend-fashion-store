import Redis from "ioredis";

let redis;
if (process.env.NODE_ENV === "production") {
    redis = new Redis(process.env.REDIS_CONNECTION_URL_STRING);
} else {
    redis = new Redis();
}

export const redisGet = async (key, store, reducer, state, thunk, options = {}) => {
    return await redis.get(key, async (err, items) => {
        if (err) console.error("we have err in redis for some reasons.", err);
        if (items) {
            return items;
        } else {
            await store.dispatch(thunk(options));
            const fetchedItems = store.getState()[reducer][state];
            if (fetchedItems.constructor === Array) {
                if (fetchedItems.length === 0) {
                    return;
                }
            } else if (fetchedItems.constructor === Object) {
                if (Object.keys(fetchedItems).length === 0) {
                    return;
                }
            }
            await redis.set(key, JSON.stringify(fetchedItems));
            return fetchedItems;
        }
    })
};

// export const redisSet = async(key, )

export default redis;