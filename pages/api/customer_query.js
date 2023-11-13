export default async function POST(req, res) {
    try {
        if (req.method !== "POST") {
            return;
        }
        if (typeof req.body === "string") {
            req.body = JSON.parse(req.body);
        }

        const response = await fetch(process.env.BACKEND + "/email/contact_us", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (data.message) {
            throw {
                status: 500,
                message: data.message
            }
        }

        res.status(200).json(data);
    } catch (error) {
        console.log("ERROR HIT FOR CUSTOMER QUERY!", error);
        return res.status(error.status ? error.status : 500).json(error.message);
    }

}