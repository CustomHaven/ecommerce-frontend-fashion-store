import redis from "../../utils/redis";

export default async function POST(req, res) {
    try {
        if (req.method === "POST") {
            if (typeof req.body === "string") {
                req.body = JSON.parse(req.body);
            }

            console.log("inside redis api");
// evaluationKey was allProducts using it for testing to see if we have something or it is null not sending back to the client



            let redisResult = [];

            if (req.body.length > 1) {
                const keyedOnce = req.body.filter((o, i, array) => { 
                    if (array[i] !== array[array.length -1]) {
                        return o;
                    }
                });
                keyedOnce.forEach(b => {
                    let arr = Object.values(b);
                    return redisResult.push({
                        keyStr: arr[0],
                        valueStr: arr[1]
                    });
                });
            } else {
                redisResult = req.body;
            }

            const newBody = {}

            req.body.forEach((o) => {
                Object.assign(newBody, o);
                delete newBody.keyStr; 
                delete newBody.noKey;
            });

            console.log("req.body", req.body);
            // console.log("keyedOnce", keyedOnce);
            console.log("redisResult", redisResult);
            console.log("newBody", newBody);

            if (newBody.usingKey.length < 1) {
                console.log("usingKey is empty", newBody.usingKey.length);
                throw {
                    status: 400,
                    message: { message: "Bad request" }
                }
            }

            if (Object.values(newBody).every(a => !a || (Array.isArray(a) && a.length < 1)) && newBody.usingKey.length < 1) {
                console.log("WE HIT THE FLAG FOR BAD REQUEST!");
                throw {
                    status: 400,
                    message: { message: "Bad request" }
                }
            }

            console.log("pass all the potential errors");

            if (newBody.evaluationKey) {
                if (Object.values(newBody).every(a => !a || (Array.isArray(a) && a.length < 1)) && newBody.usingKey.length < 1) {
                    console.log("WE HIT THE FLAG FOR BAD REQUEST A SECOND TIME!");
                    throw {
                        status: 400,
                        message: { failed: "Bad request" }
                    }
                }

                console.log("right before saving the stuff to redis! what is redisResult?");

                console.log(redisResult);

                await Promise.all(redisResult.map(async (r) => {
                    return await redis.set(r.keyStr, JSON.stringify(r.valueStr));
                }));
                console.log("redis stored!?");
                return res.status(201).json({ usingKey: newBody.usingKey });
            } else if (!newBody.hasOwnProperty("evaluationKey")) {

                await Promise.all(redisResult.map(async (r) => {
                    return await redis.set(r.keyStr, JSON.stringify(r.valueStr));
                }));

                return res.status(201).json({ usingKey: newBody.usingKey });

            }
            return res.status(201).json({ message: "No change required" });
        }

    } catch (error) {
        console.log("ERROR HIT FOR REDIS!", error);
        return res.status(error.status ? error.status : 500).json(error.message);
    }
};