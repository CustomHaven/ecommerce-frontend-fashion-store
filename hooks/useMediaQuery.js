import { useState, useEffect } from "react";
// still testing this commiting without using this hook for now
const useMediaQuery = (value) => {
    const [media, setMedia] = useState(false);
    const [mql, setMql] = useState(process?.title === "browser" ? window.matchMedia(`(max-width: ${value}px)`) : null);

    const handler = () => {
        // from value down matches = true
        // value + 1 up matches = false
        setMql(window.matchMedia(`(max-width: ${value}px)`));

        if (mql.matches) {
            setMedia(true);
        } else {
            setMedia(false);
        }
    }

    useEffect(() => {
        if (mql !== null) {
            document.addEventListener("DOMContentLoaded", () => handler());
            mql.addEventListener("change", () => handler());
            mql.addEventListener("resize", () => handler());
        }
    }, [media, mql]);

    return {
        media
    }
}

export default useMediaQuery;