import { serialize } from "cookie";

export default async function POST(req, res) {
    // process.env.BACKEND

    try {

        if (req.method === "POST") {

            console.log("NEXTJS LOGOUT ROUTE REACHED!");

            console.log("req THE COOOKIE!!!! FIND IT!", req.headers["cookie"]);
            console.log("req THE COOOKIE!!!! FIND IT!", typeof req.headers["cookie"]);

            console.log("req THE COOOKIE!!!! FIND IT!", req.headers["cookie"].replace(/^(token_id=)(.+)(;\srefresh_token=.+)$/, "$2"));


            const token = req.headers["authorization"].split(" ")[1];

            console.log("authorization header value:", token);

            const response = await fetch(process.env.BACKEND + "/auth/logout", {
            // const response = await fetch("http://localhost:5000/api/v2/auth/logout", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                        "Login-Stage": "refresh",
                        "Cookie": req.headers["cookie"].replace(/^(token_id=)(.+)(;\srefresh_token=.+)$/, "$2")
                    },
                    // body: JSON.stringify({ email: req.body.email, password: req.body.password, frontend: "incoming frontend" }),
                    credentials: "include"
            });

            const data = await response.json();
            console.log("NODEJS WAS DONE!");

            res.setHeader("Set-Cookie", [
                    // serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }),
                    serialize("token_id", "deleted", { path: "/", maxAge: -1 /* secure: true, sameSite: "lax" */ }),
                    serialize("refreshed_token", "deleted", { path: "/", maxAge: -1 /* secure: true, sameSite: "lax" */ }),
                    serialize("refresh_token", "deleted", { path: "/", maxAge: -1 })
                ]);

            // res.end();

            res.status(201).json(JSON.stringify(data));
        }

    } catch(error) {
        res.status(500).json(JSON.stringify({ message: "failed to load data" }))
    }
}