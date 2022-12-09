import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { selectArrayChunkSize, selectProductListCount, productListCounter, listSlideDirection } from "../../feature/productSlice/productSlice";

const Directions = (props) => {

    const listCount = useSelector(selectProductListCount);
    const chunkSize = useSelector(selectArrayChunkSize);
    const dispatch = useDispatch();
    const { windowWidth } = useWindowDimensions();

    const productSectionRef = useQuerySelector("#feature-product-section > div");
    const productSectionSize = useResizeObserver(productSectionRef.current, "#feature-product-section > div");
    const asideInFloat = useQuerySelector("#aside_product_menu_id");
    const asideSectionSize = useResizeObserver(asideInFloat.current, "#aside_product_menu_id");
    // const 

    const [right, setRight] = useState({ color: "var(--submit-button-100)", cursor: "pointer" });
    const [left, setLeft] = useState({ color: "var(--submit-button-100)", cursor: "pointer" });

    const style = {
        height: "10vh",
        width: `calc(${productSectionSize.inlineSize}px - 5vw)`,
        margin: `${windowWidth <= 500 ? "0px auto" : windowWidth > 600 ? "0px 0px 0px calc(" + asideSectionSize.inlineSize + "px + 70px)" :
        "0px 0px 0px calc(" + asideSectionSize.inlineSize + "px + 32px)"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "min(8vw, 2.5rem)",
        padding: "25px 0px",
    }

    const handleMouseEnterLeft = () => setLeft(prev => ({ ...prev, fontSize: "min(10vw, 3.5rem)"}));
    const handleMouseEnterRight = () => setRight(prev => ({ ...prev, fontSize: "min(10vw, 3.5rem)"}));
    const handleMouseLeaveLeft = () => setLeft(prev => ({ ...prev, fontSize: "min(8vw, 2.5rem)"}));
    const handleMouseLeaveRight = () => setRight(prev => ({ ...prev, fontSize: "min(8vw, 2.5rem)"}));

    const handleClickLeft = () => {
        dispatch(listSlideDirection("left"));
        if (listCount === 0) {
            dispatch(productListCounter(chunkSize - 1));
            // return;
        } else {
            dispatch(productListCounter(listCount - 1));
        }
    }

    const handleClickRight = () => {
        dispatch(listSlideDirection("right"));
        if (listCount + 1 === chunkSize) {
            dispatch(productListCounter(0));
        } else {
            dispatch(productListCounter(listCount + 1));
        }
    }

    return (
        <>
            <div style={style}>
                <div
                    onMouseEnter={handleMouseEnterLeft} 
                    onMouseLeave={handleMouseLeaveLeft} 
                    onClick={handleClickLeft}
                    style={left}
                >
                <BsFillArrowLeftCircleFill />
                </div>
                <div
                    onMouseEnter={handleMouseEnterRight} 
                    onMouseLeave={handleMouseLeaveRight}
                    onClick={handleClickRight}
                    style={right}
                >
                <BsFillArrowRightCircleFill />
                </div>
            </div>
        </>
    )

}

export default Directions;