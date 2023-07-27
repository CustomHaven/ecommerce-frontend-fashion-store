import finalResponse from "../../utils/api-helper";

export default async function handler(req, res) {
    // process.env.BACKEND
    // https://api-custom-ecommerce-pern.onrender.com/api/v2
    // const response = await fetch(`${API_URL}/auth/login`, {
    //     method: "POST",
    //     body: JSON.stringify({email, password}),
    //     headers: headers,
    //     credentials: "include" // This here
    // });

    // const jsonResponse = await finalResponse(response);
    // return jsonResponse;

    req.body.user;
    req.body.token;
    req.body.expiration;
    req.body.refresh_token;

    res
        .cookie("token_id", tokenId, { httpOnly: true, maxAge: expirationTime * 1000, secure: process.env.NODE_ENV === "production" ? true : false })
        .cookie("refreshed_token", token, { httpOnly: true, maxAge: expirationTime * 1000, secure: process.env.NODE_ENV === "production" ? true : false })
        .status(200).json({ user: userDone, token: getToken.token, refresh_token: tokenId });
    // res.status(200).json({ name: 'John Doe' });
}
