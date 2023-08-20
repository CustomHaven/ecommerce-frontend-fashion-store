import Redis from "ioredis";

let redis;
if (process.env.NODE_ENV === "production") {
    redis = new Redis(process.env.REDIS_CONNECTION_URL_STRING);
} else {
    redis = new Redis();
}

export const redisGet = async (key, store, reducer, state, thunk, options = {}) => {
    // console.log("redisGET IS BEING CALLED!", store, reducer, state);
    // console.log("server", server);
    // if (!server) {
    //     store = store();
    // }
    return await redis.get(key, async (err, items) => {
        if (err) {
            console.log("ARE WE IN THE ERROR redisGET?");
            console.error(err);
        }
        if (items) {
            console.log("is the items found?!");
            console.log("items I CAN LITERALLY SEE THE ITEMS THE ENTIRE STRING IN MY REDIS SO I HAVE THE VALUE!!", items.length);
            return items;
        } else {
            await store.dispatch(thunk(options));
            const fetchedItems = store.getState()[reducer][state];
            await redis.set(key, JSON.stringify(fetchedItems));
            console.log("fetchingITEMS", fetchedItems);
            console.log("fetchingITEMS ARE:", JSON.stringify(fetchedItems).length);
            console.log("fetchingITEMS DONE!!");
            return fetchedItems;
        }
    })
};

// export const redisSet = async(key, )

export default redis;