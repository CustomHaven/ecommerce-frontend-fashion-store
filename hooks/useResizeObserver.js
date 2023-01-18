import { useState, useEffect } from "react";

const useResizeObserver = (element, selector, child) => {
    const [inlineSize, setInlineSize] = useState(0); // width
    const [blockSize, setBlockSize] = useState(0); // height
    const [inlineSizeChild, setBlockSizeChild] = useState(0); // height? strange..
    const [blockSizeChild, setInlineSizeChild] = useState(0); // width? strange..


    const resizeObserver = (element) => {
        const contentBoxSize = new ResizeObserver((entries) => {
            setBlockSize(entries[0].contentBoxSize[0].blockSize);
            setInlineSize(entries[0].contentBoxSize[0].inlineSize);
            if (child) {
                if (entries[0].target.children[0] !== undefined) {
                    setBlockSizeChild(entries[0].target.children[0].offsetWidth);
                    setInlineSizeChild(entries[0].target.children[0].offsetHeight);
                }
            }
        })
        return contentBoxSize.observe(element);
    };


    useEffect(() => {
        if (element === null) {
            element = document.querySelector(selector);
        }
        if (element !== null) {
            window.addEventListener("resize", resizeObserver(element));
            window.addEventListener("change", resizeObserver(element));
        }
    }, [inlineSize, blockSize, inlineSizeChild, blockSizeChild, element, selector]);

    return {
        inlineSize,
        blockSize,
        inlineSizeChild,
        blockSizeChild
    }
}

export default useResizeObserver;