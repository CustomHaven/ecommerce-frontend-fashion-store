import { useEffect, useLayoutEffect } from 'react';

export const isClient = process?.title !== 'browser';

const useIsomorphicEffect = () => {
    console.log("isomorphic");
    if (isClient) {
        console.log("isomorpic in client");
        return useLayoutEffect;
    } //else {
        console.log("isomorpic in server");
        // return useEffect();
    // }
};

export default useIsomorphicEffect;