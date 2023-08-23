import { serialize } from "cookie";

export default async function POST(req, res) {

    try {

        if (req.method === "POST") {

            const token = req.headers["cookie"].split(";").find(t => t.match("refreshed_token")).trim().replace(/refreshed_token=/, "");
            const tokenId = req.headers["cookie"].split(";").find(t => t.match("token_id")).trim().replace(/token_id=/, "");

            const response = await fetch(process.env.BACKEND + "/auth/logout", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                        "Login-Stage": "refresh",
                        "Cookie": tokenId
                    },
                    credentials: "include"
            });

            const data = await response.json();
            console.log("data signout", data);
            res
                .setHeader("Set-Cookie", [
                    // serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }),
                    serialize("token_id", "deleted", { path: "/", httpOnly: true, maxAge: -1, secure: process.env.NODE_ENV === "production" ? true : false /* secure: true, sameSite: "lax" */ }),
                    serialize("refreshed_token", "deleted", { path: "/", httpOnly: true, maxAge: -1, secure: process.env.NODE_ENV === "production" ? true : false /* secure: true, sameSite: "lax" */ }),
                    serialize("refresh_token", "deleted", { path: "/", maxAge: -1, secure: process.env.NODE_ENV === "production" ? true : false })
                ])
                .status(201)
                .json(JSON.stringify(data));
        }
    } catch(error) {
        console.log("ERROR HIT FOR SIGNOUT!", error);
        res.status(500).json(JSON.stringify({ message: "failed to load data" }))
    }
}