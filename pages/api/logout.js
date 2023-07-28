import { serialize } from "cookie";

export default async function GET(req, res) {
    // process.env.BACKEND

    try {

        if (req.method === "GET") {
            res
                .setHeader("Set-Cookie", [
                    serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }),
                    serialize("token_id", "", { path: "/", httpOnly: true, maxAge: 0, /* secure: true, sameSite: "lax" */ }),
                    serialize("refreshed_token", "", { path: "/", httpOnly: true, maxAge: 0, /* secure: true, sameSite: "lax" */ })
                ])
                .status(200)
                .json(JSON.stringify({ message: "Logged out!" }))
        }

    } catch(error) {
        res.status(500).json(JSON.stringify({ message: "failed to load data" }))
    }
}