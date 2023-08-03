import { serialize } from "cookie";
import { customError } from "../../utils/generalUtils";
import finalResponse from "../../utils/api-helper";

export default async function POST(req, res) {
    // process.env.BACKEND

    try {
        if (req.method === "POST") {
            console.log("inside the /api/access");
            console.log(req.body.email);
            // console.log(req.body.refresh_token);
            console.log("req.body.email");

            const response = await fetch(process.env.BACKEND + "/auth/login", {
            // const response = await fetch("http://localhost:5000/api/v2/auth/login", {
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

            console.log("inside the /api/access looking at data we got?");
            console.log(data);
            console.log("inside the /api/access looking at data we got?");


            res
                .setHeader("Set-Cookie", [
                    serialize("token_id", data.refresh_token, { path: "/", httpOnly: true, maxAge: data.expiration, /* secure: true, sameSite: "lax" */ }),
                    serialize("access_token", data.access_token, { path: "/", httpOnly: true, maxAge: data.expiration, /* secure: true, sameSite: "lax" */ }),
                    serialize("refresh_token", data.refresh_token, { path: "/", httpOnly: false, maxAge: data.expiration})
                ])
                .status(201)
                .json({ message: "Access log in successfully 😊 👌", user: data.user, token: data.access_token, refresh_token: data.refresh_token })
        }

    } catch (error) {
        return res.status(error.status).json(error.message);
    }

}
