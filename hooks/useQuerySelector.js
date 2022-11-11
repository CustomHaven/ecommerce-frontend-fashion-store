import { useEffect, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';

const useQuerySelector = (selector) => {
    const element = useRef(null);

    useEffect(() => {
        const elem = document.querySelector(selector);
        // console.log("elem", elem);
        element.current = elem;
        // console.log("current element ", element.current);
    }, [element]);

    return element;
};

export default useQuerySelector;