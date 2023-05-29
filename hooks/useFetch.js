import { useState, useEffect } from "react";

const useFecth = (url, method, headers, body) => {

    const [state, setState] = useState(null);

    const fetchMethod = async () => {
        const res = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        });
        const jsonResponse = await res.json();
        setState(jsonResponse);
    }

    useEffect(() => {
        if (state === null) {
            fetchMethod();
        }
    }, []);

    return [state];
}

export default useFecth;