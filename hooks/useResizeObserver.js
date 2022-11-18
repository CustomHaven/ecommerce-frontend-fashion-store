import { useState, useEffect } from "react";

const useResizeObserver = (element, selector) => {
    const [inlineSize, setInlineSize] = useState(0); // width
    const [blockSize, setBlockSize] = useState(0); // height


    const resizeObserver = (element) => {
        const contentBoxSize = new ResizeObserver((entries) => {
            setBlockSize(entries[0].contentBoxSize[0].blockSize);
            setInlineSize(entries[0].contentBoxSize[0].inlineSize);
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
    }, [inlineSize, blockSize, element, selector]);

    return {
        inlineSize,
        blockSize
    }
}

export default useResizeObserver;