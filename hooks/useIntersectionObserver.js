import { useEffect, useMemo } from "react";
import useIsomorphicEffect from './useIsomorphicEffect';

const useIntersectionObserver = (options, targetRef, callback) => {

    // if (truthyFalsy === false) {
    //     return;
    // }

    const option = useMemo(() => options, [options]);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, option);
        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        }
    }, [option, targetRef]);
}

export default useIntersectionObserver;