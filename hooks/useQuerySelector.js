import { useEffect, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';

const useQuerySelector = (selector) => {
    const element = useRef(null);

    const handler = () => {
        const elem = document.querySelector(selector);
        element.current = elem;
    }

    useEffect(() => {
        if (document.readyState !== "loading") {
            handler();
        }
        window.addEventListener("resize", handler);
        handler();
    }, [element]);

    return element;
};

export default useQuerySelector;