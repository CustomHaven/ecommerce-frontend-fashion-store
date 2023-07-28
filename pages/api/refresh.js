import { serialize } from "cookie";
import finalResponse from "../../utils/api-helper";

export default async function POST(req, res) {
    // process.env.BACKEND

    try {
        console.log("inside the /api/refresh");
        console.log(req.body.refresh_token);
        console.log("inside the /api/refresh");

        console.log("req.body.refresh_token");
        console.log(req.body.refresh_token);
        console.log("req.body.refresh_token");


        const response = await fetch("https://api-custom-ecommerce-pern.onrender.com/api/v2/auth/refresh", {
        // const response = await fetch("http://localhost:5000/api/v2/auth/refresh", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh_token: req.body.refresh_token, frontend: "incoming frontend" }),
            // credentials: "include"
        });
    
        const data = await response.json();

        console.log("inside the /api/refresh looking at data we got?");
        console.log(data);
        console.log("inside the /api/refresh looking at data we got?");


        console.log("res");
        console.log(res);
        console.log("res");


        res
            .setHeader("Set-Cookie", [
                serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }),
                serialize("token_id", data.token, { path: "/", httpOnly: true, maxAge: data.expiration, /* secure: true, sameSite: "lax" */ }),
                serialize("refreshed_token", data.refresh_token, { path: "/", httpOnly: true, maxAge: data.expiration, /* secure: true, sameSite: "lax" */ })
            ])
            .status(201)
            .json(JSON.stringify({ message: "refresh token done!", user: data.user, token: data.refresh_token, refresh_token: data.token }))
            .end(res.getHeader('Set-Cookie'))
            // .end();

    } catch (error) {
        res.status(500).json(JSON.stringify({ message: "failed to load data" }))
    }



    // res
        // .cookie("token_id", data.refresh_token, { httpOnly: true, maxAge: expirationTime * 1000, secure: process.env.NODE_ENV === "production" ? true : false })
        // .cookie("refreshed_token", data.token, { httpOnly: true, maxAge: expirationTime * 1000, secure: process.env.NODE_ENV === "production" ? true : false })
        // .status(200).json({ user: data.user, token: data.token, refresh_token: data.refresh_token });
    // res.status(200).json({ name: 'John Doe' });
}
