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

        // handler();

        document.addEventListener("DOMContentLoaded", () => handler());
        window.addEventListener('resize', () => handler());

        // return () => window.removeEventListener('resize', () => handler());
    }, [windowWidth, windowHeight]);

    return { windowWidth, windowHeight };
}

export default useWindowDimensions;