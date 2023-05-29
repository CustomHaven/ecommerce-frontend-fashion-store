import { useState, useEffect } from "react";

const useResizeObserver = (element, selector, child) => {
    const [inlineSize, setInlineSize] = useState(0); // width
    const [blockSize, setBlockSize] = useState(0); // height
    const [inlineSizeChild, setBlockSizeChild] = useState(0); // height? strange..
    const [blockSizeChild, setInlineSizeChild] = useState(0); // width? strange..
    const [childArrayInlineSize, setChildArrayInlineSize] = useState([]);
    const [childArrayBlockSize, setChildArrayBlockSize] = useState([]);


    const resizeObserver = (element) => {
        const contentBoxSize = new ResizeObserver((entries) => {
            setBlockSize(entries[0].contentBoxSize[0].blockSize);
            setInlineSize(entries[0].contentBoxSize[0].inlineSize);
            if (child) {
                if (entries[0].target.children[0] !== undefined) {
                    setBlockSizeChild(entries[0].target.children[0].offsetWidth);
                    setInlineSizeChild(entries[0].target.children[0].offsetHeight);

                    const childArrayInline = [], childArrayBlock = [];

                    for (let i = 0; i < entries[0].target.children.length; i++) {
                        const objInline = {
                            id: entries[0].target.children[i].id,
                            inlineSize: entries[0].target.children[i].offsetWidth
                        }
                        const objBlock = {
                            id: entries[0].target.children[i].id,
                            blockSize: entries[0].target.children[i].offsetHeight
                        }

                        if (!childArrayInline.find(arr => arr.id === objInline.id)) {
                            childArrayInline.push(objInline);
                        } else {
                            return;
                        }

                        if (!childArrayBlock.find(arr => arr.id === objBlock.id)) {
                            childArrayBlock.push(objBlock);
                        } else {
                            return;
                        }
                    }

                    setChildArrayBlockSize(childArrayBlock);
                    setChildArrayInlineSize(childArrayInline);
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
    }, [element, selector]);

    return {
        inlineSize,
        blockSize,
        inlineSizeChild,
        blockSizeChild,
        childArrayInlineSize,
        childArrayBlockSize
    }
}

export default useResizeObserver;