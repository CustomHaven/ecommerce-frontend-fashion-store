import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "../../../hooks/useMediaQuery"; // this 1 done the trick!
import styles from "../../../styles/Feature.module.css";
import MinitureProductSize from "./minitureProduct";
import { chunkArray } from "../../../utils/generalUtils";
import { selectProductListCount, productArrayChunkSize, selectDisplayMax, 
    productDisplayMax, productListCounter, focusSingleProduct, 
    selectOneSingleProduct, oneDisplayedProduct } from "../../../feature/productSlice/productSlice";


const Featured = (props) => {
    const listCount = useSelector(selectProductListCount);
    const dispatch = useDispatch();
    const featureProductsContainerRef = useRef(null);


    let width;
    if (props.pageType === "Home") {
        width = 1212;
    } else if (props.pageType === "Product Listing") {
        width = 998;
    }

    const { media } = useMediaQuery(width);

    const [pageArray, setPageArray] = useState([]);

    const copyArrayHelper = (smallOrBigArray, chunkSize) => {
        const copy = chunkArray(smallOrBigArray, chunkSize);
        return copy.map((page, index) => page.map(p => ({
            ...p,
            idHTML: "product-cards-" + index 
        })));
    }

    const pageArrayFunc = () => {
        dispatch(productArrayChunkSize(props.displayMax));
        let copy;
        if (process?.title === "browser" && window.location.pathname === "/") {
            const tempArray = props.products.slice(0, props.displayMax);
            if (media) {
                dispatch(focusSingleProduct(true));
                dispatch(oneDisplayedProduct(0));
                copy = copyArrayHelper(tempArray, 1);
                setPageArray(copy);
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(tempArray, props.displayMax);
                setPageArray(copy);
            }
        } else {
            if (media) {
                dispatch(focusSingleProduct(true));
                dispatch(oneDisplayedProduct(0));
                copy = copyArrayHelper(props.products, 1);
                setPageArray(copy);
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(props.products, props.displayMax);
                setPageArray(copy);
            }
        }
    }

    useEffect(() => {
        pageArrayFunc();
    }, [props.products, props.categoryPage, process?.title === "browser" && window.location.pathname, props.displayMax, media]);

    return (
        <>
            <section data-white id="feature-product-section" className={styles.feature_section}>
                <h2>{props.headerText}</h2>
                <h3>New Modern Design Collection</h3>
                <div ref={featureProductsContainerRef}>
                    {
                        pageArray.length > 0 &&
                        pageArray[listCount].map((item) => <MinitureProductSize item={item} key={item.id} />)
                    }
                </div>
            </section>
        </>
    );
}

export default Featured;