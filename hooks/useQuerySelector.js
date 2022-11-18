import { useState, useEffect, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';
import { watchHrefChange } from '../utils/hrefChangeHelper';

const useQuerySelector = (selector) => {
    const element = useRef(null);
    const [href, setHref] = useState(process?.title === "browser" && window.location.href);

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
        window.onload = watchHrefChange(href, setHref, element, selector);

    }, [element, href]);

    return element;
};

export default useQuerySelector;