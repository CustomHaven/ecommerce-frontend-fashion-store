import redis from "../../utils/redis";

export default async function POST(req, res) {
    try {
        if (req.method === "POST") {
            if (typeof req.body === "string") {
                req.body = JSON.parse(req.body);
            }
// evaluationKey was allProducts using it for testing to see if we have something or it is null not sending back to the client

            const keyedOnce = req.body.filter((o, i, array) => { 
                if (array[i] !== array[array.length -1]) {
                    return o;
                }
            });

            const redisResult = [];

            keyedOnce.forEach(b => {
                let arr = Object.values(b);
                return redisResult.push({
                    keyStr: arr[0],
                    valueStr: arr[1]
                });
            });

            const newBody = {}

            req.body.forEach((o) => {
                Object.assign(newBody, o);
                delete newBody.keyStr; 
                delete newBody.noKey;
            });

            if (Object.values(newBody).every(a => !a || (Array.isArray(a) && a.length < 1)) && newBody.usingKey.length < 1) {
                console.log("WE HIT THE FLAG FOR BAD REQUEST!");
                throw {
                    status: 400,
                    message: { message: "Bad request" }
                }
            }

            if (newBody.evaluationKey) {
                if (Object.values(newBody).every(a => !a || (Array.isArray(a) && a.length < 1)) && newBody.usingKey.length < 1) {
                    console.log("WE HIT THE FLAG FOR BAD REQUEST A SECOND TIME!");
                    throw {
                        status: 400,
                        message: { failed: "Bad request" }
                    }
                }

                await Promise.resolve(redisResult.forEach(async (r) => {
                    await redis.set(r.keyStr, JSON.stringify(r.valueStr));
                }));

                return res.status(201).json({ usingKey: newBody.usingKey });
            } else {
                if (newBody.hasOwnProperty("reduxAllProducts")) {
                    if (JSON.stringify(newBody.evaluationKey) !== JSON.stringify(newBody.reduxAllProducts)) {

                        await Promise.resolve(redisResult.forEach(async (r) => {
                            await redis.set(r.keyStr, JSON.stringify(r.valueStr));
                        }));

                        return res.status(201).json({ usingKey: newBody.usingKey });
                    }
                } else {
                    if (JSON.stringify(newBody.evaluationKey) !== JSON.stringify(newBody.usingKey)) {

                        await Promise.resolve(redisResult.forEach(async (r) => {
                            await redis.set(r.keyStr, JSON.stringify(r.valueStr));
                        }));
                        
                        return res.status(201).json({ usingKey: newBody.usingKey });
                    }
                }
            }
            return res.status(201).json({ message: "No change required" });
        }

    } catch (error) {
        console.log("ERROR HIT FOR REDIS!", error);
        return res.status(error.status ? error.status : 500).json(error.message);
    }
};