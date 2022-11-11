import { useState, useEffect } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

const useMediaQuery = (value) => {
    const [media, setMedia] = useState(false);
    const [mql] = useState(process?.title === "browser" ? window.matchMedia(`(max-width: ${value}px)`) : null);

    const handler = () => {
        // from value down matches = true
        // value + 1 up matches = false
        if (mql.matches) {
            setMedia(true);
        } else {
            setMedia(false);
        }
    }
//
    useEffect(() => {
        if (document.readyState !== "loading") {
            handler();
        }
        window.addEventListener("resize", handler);
    }, [media]);

    return {
        media,
        mql
    }
}

export default useMediaQuery;