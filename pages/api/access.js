import { serialize } from "cookie";

export default async function POST(req, res) {

    try {
        if (req.method === "POST") {
            console.log("we are at access")
            const response = await fetch(process.env.BACKEND + "/auth/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: req.body.email, password: req.body.password, frontend: "incoming frontend" }),
                credentials: "include"
            });

            const data = await response.json();

            if (data.message) {
                throw {
                    status: 409,
                    message: { failed: data.message }
                }
            }

            res
                .setHeader("Set-Cookie", [
                    serialize("token_id", data.refresh_token, { path: "/", httpOnly: true, maxAge: data.expiration, secure: process.env.NODE_ENV === "production" ? true : false /* secure: true, sameSite: "lax" */ }),
                    serialize("access_token", data.access_token, { path: "/", httpOnly: true, maxAge: data.expiration, secure: process.env.NODE_ENV === "production" ? true : false /* secure: true, sameSite: "lax" */ }),
                    serialize("refresh_token", data.refresh_token, { path: "/", httpOnly: false, maxAge: data.expiration, secure: process.env.NODE_ENV === "production" ? true : false })
                ])
                .status(201)
                .json({ message: "Access log in successfully 😊 👌", user: data.user, token: data.access_token, refresh_token: data.refresh_token })
        }
    } catch (error) {
        return res.status(error.status).json(error.message);
    }
}