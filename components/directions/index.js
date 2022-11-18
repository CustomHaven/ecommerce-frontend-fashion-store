import React, { useState, useEffect, useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";

const Directions = (props) => {

    const productSectionRef = useQuerySelector("#feature-product-section > div");
    const { inlineSize } = useResizeObserver(productSectionRef.current, "#feature-product-section > div");
    const [right, setRight] = useState({ color: "var(--submit-button-100)", cursor: "pointer" });
    const [left, setLeft] = useState({ color: "var(--submit-button-100)", cursor: "pointer" });

    const style = {
        height: "10vh",
        width: `calc(${inlineSize}px - 5vw)`,
        margin: "0px auto",
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

    }

    const handleClickRight = () => {

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