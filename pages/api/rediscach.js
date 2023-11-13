import redis from "../../utils/redis";

export default async function POST(req, res) {
    try {
        if (req.method === "POST") {
            if (typeof req.body === "string") {
                req.body = JSON.parse(req.body);
            }

            const cached = await redis.get(req.body.keyStr);


            if (cached === null) {
                throw {
                    status: 404,
                    message: { message: "Not found" }
                }
            }
            const caching = JSON.parse(cached);

            return res.status(201).json({ cached: caching });


        }
    } catch (error) {
        console.log("ERROR HIT NO CACH!", error);
        return res.status(error.status ? error.status : 500).json(error.message);
    }
}