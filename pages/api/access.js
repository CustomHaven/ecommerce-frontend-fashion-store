import { serialize } from "cookie";
import finalResponse from "../../utils/api-helper";

export default async function handler(req, res) {
    // process.env.BACKEND

    try {
        console.log("inside the /api/refresh");
        console.log(req.body.refresh_token);
        console.log("inside the /api/refresh");
    
        const response = await fetch("https://api-custom-ecommerce-pern.onrender.com/api/v2/auth/login", {
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
        console.log("inside the /api/refresh looking at data we got?");
        console.log(data);
        console.log("inside the /api/refresh looking at data we got?");

        console.log("res");
        console.log(res);
        console.log("res");
    
        res
            .setHeader("Set-Cookie", [
                serialize("token_id", data.refresh_token, { path: "/", httpOnly: true, maxAge: data.expiration, /* secure: true, sameSite: "lax" */ }),
                serialize("access_token", data.access_token, { path: "/", httpOnly: true, maxAge: data.expiration, /* secure: true, sameSite: "lax" */ })
            ])
            .status(200)
            .json({ message: "Access log in successfully 😊 👌", user: data.user, token: data.access_token, refresh_token: data.refresh_token })
            .end(res.getHeader('Set-Cookie'))
            // .end();
    
        // res.status(200).end();

    } catch (error) {
        res.status(500).json({ message: "failed to load data" })
    }



    // res
        // .cookie("token_id", data.refresh_token, { httpOnly: true, maxAge: expirationTime * 1000, secure: process.env.NODE_ENV === "production" ? true : false })
        // .cookie("refreshed_token", data.token, { httpOnly: true, maxAge: expirationTime * 1000, secure: process.env.NODE_ENV === "production" ? true : false })
        // .status(200).json({ user: data.user, token: data.token, refresh_token: data.refresh_token });
    // res.status(200).json({ name: 'John Doe' });
}
