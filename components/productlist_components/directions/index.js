import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import useQuerySelector from "../../../hooks/useQuerySelector";
import useResizeObserver from "../../../hooks/useResizeObserver";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { selectArrayChunkSize, selectProductListCount, productListCounter, 
    listSlideDirection, selectOneSingleProduct, oneDisplayedProduct } from "../../../feature/productSlice/productSlice";

const Directions = (props) => {

    const listCount = useSelector(selectProductListCount);
    const chunkSize = useSelector(selectArrayChunkSize);
    const focusSingleProduct = useSelector(selectOneSingleProduct);
    const dispatch = useDispatch();
    const { windowWidth } = useWindowDimensions();
    
    const productSectionSize = useResizeObserver(null, "#feature-product-section > div", true);
    const asideInFloat = useQuerySelector("#aside_product_menu_id");
    const asideSectionSize = useResizeObserver(asideInFloat.current, "#aside_product_menu_id");

    const [styleRightArrow, setStyleRightArrow] = useState({ color: "var(--submit-button-100)", cursor: "pointer" });
    const [styleLeftArrow, setStyleLeftArrow] = useState({ color: "var(--submit-button-100)", cursor: "pointer" });

    let margin;

    if (asideInFloat.current !== null) {
        if (windowWidth >= 1450) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 5vw)";
        } else if (windowWidth >= 999 && windowWidth < 1450) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 7vw)";
        } else if (windowWidth < 999 && windowWidth >= 950) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 20vw)";
        } else if (windowWidth < 950 && windowWidth >= 800) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 18vw)";
        } else if (windowWidth < 800 && windowWidth >= 675) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 15vw)";
        } else if (windowWidth < 675 && windowWidth >= 601) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 12vw)";
        } else if (windowWidth < 601 && windowWidth >= 576) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 8vw)";
        } else if (windowWidth < 576 && windowWidth >= 533) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 5vw)";
        } else if (windowWidth < 533 && windowWidth >= 501) {
            margin = "50px 0px 50px calc(" + asideSectionSize.inlineSize + "px + 3vw)";
        } else {
            margin = "50px auto";
        }
    } else {
        margin = "50px auto";
    }

    const style = {
        height: "10vh",
        width: `${focusSingleProduct === false ?
            "calc(" + productSectionSize.inlineSize + "px - 5vw)" :
            windowWidth > 350 ? 
            "calc(" + productSectionSize.inlineSizeChild + "px + 15vw)" : 
            productSectionSize.inlineSizeChild + "px"}`,
        margin: margin,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "min(8vw, 2.5rem)",
        padding: "25px 0px",
    }

    const handleMouseEnterLeft = () => setStyleLeftArrow(prev => ({ ...prev, fontSize: "min(10vw, 3.5rem)"}));
    const handleMouseEnterRight = () => setStyleRightArrow(prev => ({ ...prev, fontSize: "min(10vw, 3.5rem)"}));
    const handleMouseLeaveLeft = () => setStyleLeftArrow(prev => ({ ...prev, fontSize: "min(8vw, 2.5rem)"}));
    const handleMouseLeaveRight = () => setStyleRightArrow(prev => ({ ...prev, fontSize: "min(8vw, 2.5rem)"}));

    const handleLeftClick = () => {
        if (focusSingleProduct || process.title === "browser" && window.location.pathname !== "/") {
            dispatch(listSlideDirection("left"));
            if (listCount === 0) {
                dispatch(productListCounter(chunkSize - 1));
                if (focusSingleProduct) {
                    dispatch(oneDisplayedProduct(chunkSize - 1));
                }
            } else {
                dispatch(productListCounter(listCount - 1));
                if (focusSingleProduct) {
                    dispatch(oneDisplayedProduct(listCount - 1));
                }
            }
        }
    }

    const handleRightClick = () => {
        if (focusSingleProduct || process.title === "browser" && window.location.pathname !== "/") {
            dispatch(listSlideDirection("right"));
            if (listCount + 1 === chunkSize) {
                dispatch(productListCounter(0));
                if (focusSingleProduct) {
                    dispatch(oneDisplayedProduct(0));
                }
            } else {
                dispatch(productListCounter(listCount + 1));
                if (focusSingleProduct) {
                    dispatch(oneDisplayedProduct(listCount + 1));
                }
            }
        }
    }

    return (
        <>
            <div style={style}>
                <div
                    onMouseEnter={handleMouseEnterLeft} 
                    onMouseLeave={handleMouseLeaveLeft} 
                    onClick={handleLeftClick}
                    style={styleLeftArrow}
                >
                <BsFillArrowLeftCircleFill />
                </div>
                <div
                    onMouseEnter={handleMouseEnterRight} 
                    onMouseLeave={handleMouseLeaveRight}
                    onClick={handleRightClick}
                    style={styleRightArrow}
                >
                <BsFillArrowRightCircleFill />
                </div>
            </div>
        </>
    )
}

export default Directions;