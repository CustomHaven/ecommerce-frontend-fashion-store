import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import useMediaQuery from "../../../hooks/useMediaQuery"; // this 1 done the trick!
import styles from "../../../styles/Feature.module.css";
import MinitureProductSize from "./minitureProduct";
import { chunkArray } from "../../../utils/generalUtils";
import { selectProductListCount, productArrayChunkSize, selectDisplayMax, 
    productDisplayMax, productListCounter, focusSingleProduct, 
    selectOneSingleProduct, oneDisplayedProduct, allProductsThunk, 
    selectAllProductsRandomized, selectAllProducts } from "../../../feature/productSlice/productSlice";


const Featured = (props) => {
    const [localProductState, setLocalProductState] = useState(null);
    const listCount = useSelector(selectProductListCount);
    const randomListedProducts = useSelector(selectAllProductsRandomized);
    const allTheProducts = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const featureProductsContainerRef = useRef(null);

    console.log("right above the SWR", props.products);


    useEffect(() => {
        if (!props.products) {
            dispatch(allProductsThunk());
        }
    }, [])

    useEffect(() => {
        if (allProductsThunk.length > 0) {
            fetcher();
        }
    }, [allTheProducts]);

    const fetcher = async () => {
        console.log("inside the useSWR!");
        // dispatch(allProductsThunk());
        const response = await fetch("/api/redis", {
            method: "POST",
            body: JSON.stringify({
                allProducts: props.allProducts,
                randomProducts: props.products,
                reduxAllProducts: allTheProducts,
                reduxRandomProducts: randomListedProducts
            })
        });
        console.log("OKAY RESPONSE SWR DONE!");
        console.log("RESPONSE DONE FROM SWR!", response);
        const jsonRespons = await response.json();
        console.log("jsonRespons in the useSWR:!!", jsonRespons);
        if (jsonRespons.message) {
            return null;
        } else {
            props.setAllRandomProducts(jsonRespons.allRandomProducts);
            return;
            // return randomListedProducts;
        }
    }

    // const { data: swrData } = useSWR("randomListing", fetcher);

    // console.log("SWRDATA WE GOT SOMETHING!", swrData);

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
        return copy.map((page) => page.map((p, i) => ({
            ...p,
            idHTML: "product-cards-" + i
        })));
    }

    const pageArrayFunc = () => {
        dispatch(productArrayChunkSize(props.displayMax));
        let copy;
        if (process?.title === "browser" && window.location.pathname === "/") {
            console.log("are you entering here SHOW URSELF?!")
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
        if (props.products !== null) {
            pageArrayFunc();
        }
    }, [props.products, props.categoryPage, process?.title === "browser" && window.location.pathname, props.displayMax, media]);

    // useEffect(() => {
    //     fetcher();
    // }, []);

    // useEffect(() => {
    //     if (localProductState) {
    //         props.setAllRandomProducts(localProductState);
    //     }
    // }, [localProductState]);

    // useEffect(() => {
    //     if (swrData) {
    //         console.log("look at swrData again!", swrData);
    //         // console.log("swrData we have what next? swrData.swrData ", swrData);
    //         if (swrData.length > 0) {
    //             console.log("SWRDATA SHOULD FIRE UP NOW!!!");
    //             props.setAllRandomProducts(swrData);
    //             console.log("SWRDATA IS FINALLY!!", swrData);
    //         }
    //     }
    // }, [swrData]);

    return (
        <>
            <section data-white id="feature-product-section" className={styles.feature_section}>
                <h2>{props.headerText}</h2>
                <h3>{props.subHeader}</h3>
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