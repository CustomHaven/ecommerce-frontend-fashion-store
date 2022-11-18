import { useState, useEffect, useMemo } from "react";
import useIsomorphicEffect from './useIsomorphicEffect';

const useIntersectionObserver = (options, targetRefs, callback) => {

    const option = useMemo(() => options, [options]);
    const [observer] = useState(process?.title === "browser" && new IntersectionObserver(callback, option));

    useEffect(() => {
        // const observer = new IntersectionObserver(callback, option);
        // const currentTarget = targetRefs.current;
        if (Array.isArray(targetRefs)) {
            if (!targetRefs.includes(null)) {
                targetRefs.forEach((currentTarget) => {
                    if (currentTarget.current !== null) {
                        observer.observe(currentTarget.current);
                    }
                });
            }
        }

        return () => {
            if (Array.isArray(targetRefs)) {
                if (!targetRefs.includes(null)) {
                    targetRefs.forEach((currentTarget) => {
                        if (currentTarget.current !== null) {
                            observer.unobserve(currentTarget.current);
                        }
                    });
                }
            }
        }
    }, [option, targetRefs]);

    return { observer };
}

export default useIntersectionObserver;