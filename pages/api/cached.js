export default async function POST(req, res) {
    try {
        if (req.method === "POST") {
            if (process.env.NODE_ENV === "production") {
                console.log("API?CAHCED WE ARE IN! REQ.body", req.body);
                console.log("API?CAHCED WE ARE IN! TYPEOF req.body", typeof req.body);
                if (typeof req.body === "string") req.body = JSON.parse(req.body);
                req.body.value = JSON.stringify(req.body.value);
                console.log("THE NEW BODY", req.body);
                console.log("THE TYPEOF NEW BODY", typeof req.body);
                const redis = await fetch(process.env.REDIS_REST_URL + `/${req.body.method}/${req.body.key}${req.body.value ? `/${req.body.value}` : ""}`, {
                    headers: {
                        Authorization: "Bearer " + process.env.REDIS_REST_TOKEN
                    }
                });
                console.log("REDIS is what? in cached", redis);
                const redisResponse = await redis.json();
                console.log("redisResponse cached!", redisResponse);
                // console.log(process.env.REDIS_REST_URL + `/${req.body.method}/${req.body.key}${req.body.value ? `/${req.body.value}` : ""}`);
                // console.log(redisResponse);

                if (!redisResponse || !redisResponse.result) {
                    throw {
                        status: 404,
                        message: "Not found"
                    }
                }
                return res.status(200).json({ redis: redisResponse });
            } else {
                console.log("NOT IN PRODUCTION");
                throw {
                    status: 405,
                    message: "Method not allowed"
                }
            }
        }
    } catch (error) {
        console.log("ERROR HIT FOR CACHED!", error);
        return res.status(error.status ? error.status : 500).json(error.message);
    }
}