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
    const [monitorCaching, setMonitorCaching] = useState(props.allProducts);
    const [cachedProducts, setCachedProducts] = useState(null);
    const [localProductState, setLocalProductState] = useState(null);
    const [reSetCaching, setReSetCaching] = useState(0);
    const [finalCachingStage, setFinalCachingStage] = useState(0);
    const listCount = useSelector(selectProductListCount);
    const randomListedProducts = useSelector(selectAllProductsRandomized);
    const allTheProducts = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const featureProductsContainerRef = useRef(null);

    // console.log("THE START! props.allProducts", props.allProducts);

    const obj = [
        {
            keyStr: "all_products",
            reduxAllProducts: allTheProducts
        },
        {
            keyStr: "all_products_randomized",
            usingKey: randomListedProducts
        },
        {
            noKey: "empty",
            evaluationKey: props.allProducts,
            randomProducts: props.allTheRandomProducts
        }
    ];

    console.log("right above the SWR", props.allTheRandomProducts);

    // API?CAHCED WE ARE IN! REQ.body {"set":"foo","value":"get"}
    // API?CAHCED WE ARE IN! TYPEOF req.body string

    // For quick test remove afterwards!
    const cached = async (method, key, value) => {
        const response = await fetch("/api/cached", {
            method: "POST",
            body: JSON.stringify({
                method,
                key,
                value
            })
        });
        const res = await response.json();
        if (res.message === "Not found") {
            // console.log("RES ERROR CACHING RETURNS:!, ", res);
            setCachedProducts(null);
            setFinalCachingStage(0);
            return;
        } else {
            // console.log("RES CACHING RETURNS:!, ", res.redis);
            // console.log("TYPE OF THIS CACHED RESP ", typeof res.redis.result);
            setMonitorCaching(allTheProducts);
            setCachedProducts(JSON.parse(res.redis.result));
            return;
        }
    }

    useEffect(() => {
        dispatch(allProductsThunk());
    }, []);

    useEffect(() => {
        if (!props.allTheRandomProducts) {
            setLocalProductState(10);
        }
    }, []);

    useEffect(() => {
        if (allProductsThunk.length > 0) {
            fetcher(obj);
        }
    }, [allTheProducts]);

    const fetcher = async (input) => {
        // console.log("localProductState", localProductState);
        // console.log("props.allProducts", props.allProducts);
        if (localProductState) {
            // console.log("inside the useSWR!");
            // dispatch(allProductsThunk());

            const response = await fetch("/api/redis", {
                method: "POST",
                body: JSON.stringify(input)
                // body: JSON.stringify({
                //     allProducts: props.allProducts,
                //     randomProducts: props.allTheRandomProducts,
                //     reduxAllProducts: allTheProducts,
                //     reduxRandomProducts: randomListedProducts,
                //     key_str: "all_products",
                    
                // })
            });
            // console.log("OKAY RESPONSE SWR DONE!");
            // console.log("RESPONSE DONE FROM SWR!", response);
            const jsonRespons = await response.json();
            // console.log("jsonRespons in the useSWR:!!", jsonRespons);
            if (jsonRespons.message) {
                return null;
            } else {
                // console.log("ARE WE ABOVE SET MONITOR CACHING?", jsonRespons.usingKey);
                setMonitorCaching(allTheProducts);
                props.setAllRandomProducts(jsonRespons.usingKey);
                return;
            }
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
            const tempArray = props.allTheRandomProducts.slice(0, props.displayMax);
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
                copy = copyArrayHelper(props.allTheRandomProducts, 1);
                setPageArray(copy);
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(props.allTheRandomProducts, props.displayMax);
                setPageArray(copy);
            }
        }
    }

    useEffect(() => {
        if (props.allTheRandomProducts !== null) {
            pageArrayFunc();
        }
    }, [props.allTheRandomProducts, props.categoryPage, process?.title === "browser" && window.location.pathname, props.displayMax, media]);

    useEffect(() => {
        cached("get", "all_products");
        // cached("del", "foo");
    }, [monitorCaching, finalCachingStage]);

    useEffect(() => {
        if (cachedProducts) {
            if (finalCachingStage === 1) {
                console.log("THIS IS GETTING CALLED AGAIN BECAUSE FINALCACHINGSTAGE IS: ", finalCachingStage);
            }
            // console.log("cachedProducts", cachedProducts);
            // console.log("monitorCaching", monitorCaching);
            if (JSON.stringify(monitorCaching) === JSON.stringify(cachedProducts)) {
                console.log("THEY ARE EQUAL!");
            } else {
                console.log("cachedProducts");
                dispatch(allProductsThunk());
                setReSetCaching(1);
                console.log("THEY ARE NOT EQUAL!");
            }
        }
    }, [cachedProducts, finalCachingStage]);

    useEffect(() => {
        if (reSetCaching) {
            const ll = [
                {
                    keyStr: "all_products",
                    reduxAllProducts: allTheProducts
                },
                {
                    keyStr: "all_products_randomized",
                    usingKey: randomListedProducts
                },
                {
                    noKey: "empty",
                    evaluationKey: props.allProducts,
                    randomProducts: props.allTheRandomProducts
                }
            ];
            fetcher(ll);
            // cached("set", "all_product_randomized", JSON.stringify(randomListedProducts));
            // cached("set", "all_products", JSON.stringify(allTheProducts));
            console.log("DONE IR NOW?!");

            setFinalCachingStage(1);
            setReSetCaching(0);
        }
    }, [reSetCaching]);

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