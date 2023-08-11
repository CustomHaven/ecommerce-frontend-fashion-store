import { serialize } from "cookie";

export default async function POST(req, res) {

    try {
        if (req.method === "POST") {

            const response = await fetch(process.env.BACKEND + "/auth/refresh", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh_token: req.body.refresh_token, frontend: "incoming frontend" }),
                // credentials: "include"
            });
        
            const data = await response.json();

            res
                .setHeader("Set-Cookie", [
                    serialize("access_token", "deleted", { path: "/", httpOnly: true, maxAge: -1, secure: process.env.NODE_ENV === "production" ? true : false }),
                    serialize("token_id", data.token, { path: "/", httpOnly: true, maxAge: data.expiration, secure: process.env.NODE_ENV === "production" ? true : false /* secure: true, sameSite: "lax" */ }),
                    serialize("refreshed_token", data.refresh_token, { path: "/", httpOnly: true, maxAge: data.expiration, secure: process.env.NODE_ENV === "production" ? true : false /* secure: true, sameSite: "lax" */ }),
                    serialize("refresh_token", data.token, { path: "/", httpOnly: false, maxAge: data.expiration, secure: process.env.NODE_ENV === "production" ? true : false })
                ])
                .status(201)
                .json({ user: data.user, token: data.refresh_token, refresh_token: data.token })
                // .end(res.getHeader('Set-Cookie'))
                // .end();
        }
    } catch (error) {
        console.log("ERROR HIT FOR REFRESH!", error);
        res.status(500).json(JSON.stringify({ message: "failed to load data" }))
    }
}