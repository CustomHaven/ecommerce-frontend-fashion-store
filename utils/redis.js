import Redis from "ioredis";

let redis;
if (process.env.NODE_ENV === "production") {
    redis = new Redis(process.env.REDIS_LAB_CONNECTION_STRING);
} else {
    redis = new Redis();
    console.log("REDIS", redis);
}
//process.env.REDIS_LAB_CONNECTION_STRING
//process.env.REDIS_CONNECTION_URL_STRING

// await redis.get("all_products_randomized", async (err, products) => {
//     console.log("We are in the redis.get! randoms");
//         if (err) console.error(err);
//         if (products != null) {
//         // console.log("WE HAVE THE RANDOMPRODUCTS!", products.length);
//             return products;
//         } else {
//             await store.dispatch(allProductsThunk());
//             await redis.set("all_products_randomized", JSON.stringify(store.getState().products.allProductsRandomized));
//             return store.getState().products.allProductsRandomized;
//         }
// });

export const redisGet = async (key, store, reducer, state, thunk, options = {}) => {
    console.log("redisGET IS BEING CALLED!", store, reducer, state);
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
            const fetchingItems = store.getState()[reducer][state];
            await redis.set(key, JSON.stringify(fetchingItems));
            console.log("fetchingITEMS");
            console.log("fetchingITEMS ARE:", fetchingItems);
            console.log("fetchingITEMS DONE!!");
            return fetchingItems;
        }
    })
};

// export const redisSet = async(key, )

export default redis;