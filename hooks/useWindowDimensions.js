import { useState, useEffect } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

const useWindowDimensions = () => {
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();

    const handler = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        if (document.readyState !== "loading") {
            handler();
        }
        window.addEventListener('resize', handler);

    }, [windowWidth, windowHeight]);

    return { windowWidth, windowHeight };
}

export default useWindowDimensions;