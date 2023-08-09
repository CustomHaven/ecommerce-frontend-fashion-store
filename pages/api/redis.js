// import redis from "../../utils/redis";

export default async function POST(req, res) {
    try {
        if (req.method === "POST") {
            if (typeof req.body === "string") {
                req.body = JSON.parse(req.body);
            }
            if (Object.values(req.body).every(a => !a || (Array.isArray(a) && a.length < 1))) {
                console.log("WE HIT THE FLAG FOR BAD REQUEST!");
                throw {
                    status: 400,
                    message: { message: "Bad request" }
                }
            }

            console.log("WE ARE IN THE API REDIS?!?!?!", req.body);
            console.log("req.body IS THIS WHAT BOOLEAN EXACTLY?", Object.values(req.body).every(a => !a || (Array.isArray(a) && a.length < 1)));
            console.log("req.body is it strings?! reduxAllProducts is it what?", typeof req.body.reduxAllProducts);
            console.log("ITS ALL GOOD");
            console.log("req.body.allProducts WHAT THE HELL IS IT?", req.body.allProducts);
            if (!req.body.allProducts) {
                // await redis.set("all_products_randomized", JSON.stringify(randomListedProducts));
                // await redis.set("all_products", JSON.stringify(allTheProducts));
                console.log("req.body.allProducts is empty!", typeof req.body.allProducts);
                console.log("req.body.reduxRandomProducts WHAT IS IT?", req.body.reduxRandomProducts);
                console.log("REQ>BODY IS IT AN OBJECT?", typeof req.body);
                console.log("REQ>BODY IS IT AN OBJECT VALUES!!!CHECK?", Object.values(req.body));
                if (Object.values(req.body).every(a => !a || (Array.isArray(a) && a.length < 1))) {
                    console.log("WE HIT THE FLAG FOR BAD REQUEST A SECOND TIME!");
                    throw {
                        status: 400,
                        message: { failed: "Bad request" }
                    }
                }
                return res.status(201).json({
                    allProducts: req.body.reduxAllProducts,
                    allRandomProducts: req.body.reduxRandomProducts
                });
                // return props.setAllRandomProducts(randomListedProducts);
            } else {
                if (JSON.stringify(req.body.allProducts) !== JSON.stringify(randomListedProducts)) {
                    // await redis.set("all_products_randomized", JSON.stringify(req.body.reduxRandomProducts));
                    // await redis.set("all_products", JSON.stringify(req.body.reduxAllProducts));
                    // return props.setAllRandomProducts(randomListedProducts);
                    return res.status(201).json({
                        allProducts: req.body.reduxAllProducts,
                        allRandomProducts: req.body.reduxRandomProducts
                    });
                }
            }
            return res.status(201).json({ message: "No change required" });
        }

    } catch (error) {
        console.log("ERROR HIT");
        return res.status(error.status).json(error.message);
    }
};