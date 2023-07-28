import { serialize } from "cookie";

export default async function GET(req, res) {
    // process.env.BACKEND

    try {

        if (req.method === "GET") {

            const response = await fetch(process.env.BACKEND + "/auth/logout", {
                // const response = await fetch("http://localhost:5000/api/v2/auth/login", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    // body: JSON.stringify({ email: req.body.email, password: req.body.password, frontend: "incoming frontend" }),
                    credentials: "include"
            });

            await response.json();

            res
                .setHeader("Set-Cookie", [
                    // serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }),
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