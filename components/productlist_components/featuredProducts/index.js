import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import useMediaQuery from "../../../hooks/useMediaQuery"; // this 1 done the trick!
import styles from "../../../styles/Feature.module.css";
import MinitureProductSize from "./minitureProduct";
import { chunkArray } from "../../../utils/generalUtils";
import { selectProductListCount, productArrayChunkSize, selectDisplayMax, 
    productDisplayMax, productListCounter, focusSingleProduct, 
    selectOneSingleProduct, oneDisplayedProduct, allProductsThunk, 
    selectAllProductsRandomized, selectAllProducts, savePageArrayLength,
    selectPageArrayLength, selectSlideShowPressCount, selectAllMensProducts,
    selectMensTop, selectMensBottom, selectAllWomensProducts,
    selectWomensTop, selectWomensBottom, selectDisplayCategoryList,
    displayProductCategory } from "../../../feature/productSlice/productSlice";
import { controlProductDirectionHelper, selectProductsDirectionsHelper, selectSubCatPathLocation } from "../../../feature/generalComponents/generalComponentSlice";
import { productCategoriesSeparator, finalSubCatListing } from "../../../utils/subCatHelper";


const Featured = (props) => {
    console.log("inside feature props.redisCached?", props.redisCached);
    const dispatch = useDispatch();
    const [monitorCaching, setMonitorCaching] = useState(props.allProducts);
    const [cachedProducts, setCachedProducts] = useState(null);
    const [getCachedError, setGetCachedError] = useState(false);
    const [localProductState, setLocalProductState] = useState(null);
    const [reSetCaching, setReSetCaching] = useState(0);
    const [finalCachingStage, setFinalCachingStage] = useState(0);
    const [subCatListing, setSubCatListing] = useState(null);

    const allMensProducts = useSelector(selectAllMensProducts);
    const mensTop = useSelector(selectMensTop);
    const mensBottom = useSelector(selectMensBottom);
    const allWomensProducts = useSelector(selectAllWomensProducts);
    const womensTop = useSelector(selectWomensTop);
    const womensBottom = useSelector(selectWomensBottom);
    const displayCategoryList = useSelector(selectDisplayCategoryList);

    const subProductsObj = {
        ma: allMensProducts,
        mt: mensTop,
        mb: mensBottom,
        wa: allWomensProducts,
        wt: womensTop,
        wb: womensBottom
    }

    const listCount = useSelector(selectProductListCount);
    const randomListedProducts = useSelector(selectAllProductsRandomized);
    const allTheProducts = useSelector(selectAllProducts);
    const productsDirectionsHelper = useSelector(selectProductsDirectionsHelper);
    const singleProduct = useSelector(selectOneSingleProduct);
    const slideShowPressCount = useSelector(selectSlideShowPressCount);
    const subCatPathLocation = useSelector(selectSubCatPathLocation);
    const [domNode, setDomNode] = useState(null);
    // const featureProductsContainerRef = useRef(null);
    const featureContainerRef = useCallback(node => {
        if (node === null) {
            console.log("node is nothing?!", node);
            setDomNode(null);
        } else {
            console.log("node is something", node);
            setDomNode(node.children[0].id);
            dispatch(oneDisplayedProduct(node.children[0].id));
        }
    }, [slideShowPressCount]);

    useEffect(() => {
        console.log("outside the monitorCaching for displayProductCategory?");
        if (monitorCaching) {
            console.log("are we inside this monitorCaching for displayProductCategory?");
            if (props.redisCached && props.productTypeStr && monitorCaching.length > 1) {
                setMonitorCaching(monitorCaching.filter(products => {
                    if (products.type.match(props.productTypeStr)) {
                        return products;
                    }
                }));
                dispatch(displayProductCategory(monitorCaching.filter(products => {
                    if (products.type.match(props.productTypeStr)) {
                        return products;
                    }
                })));
            }
        }
    }, [props.allProducts]);


    useEffect(() => {
        if (props.pageSub === "Sub-category Listing" && !props.redisCached) {
            console.log("1st STAGE MUST CALL THIS NOW!");
            productCategoriesSeparator(null, props.theProductsAll, props.pagePath, setSubCatListing, "", false, dispatch);
        }
    }, [props.theProductsAll, props.pagePath, process.title === "browser" && window.location.pathname]);

    useEffect(() => {
        if (props.pageSub === "Sub-category Listing") {
            if (subCatListing) {
                console.log("2nd STAGE subCatlisting");
                finalSubCatListing(dispatch, props.pagePath, subProductsObj);
            }
        }
    }, [subCatListing]);

    useEffect(() => {
        if (props.pageSub === "Sub-category Listing") {
            if (displayCategoryList.length > 0) {
                console.log("3rd STAGE subCatlisting");
                props.setUsingProducts(displayCategoryList);
            }
        }
    }, [displayCategoryList]);

    useEffect(() => {
        if (props.redisCached) {
            console.log("monitorCaching we have a new listing?", monitorCaching);
            console.log("we are getting the catList redis in feature");
            cached("get", props.pagePath.replace(/\s/, "_"));
        }
    }, [monitorCaching, finalCachingStage]);

    // useEffect(() => {
    //     if (getCachedError) {
    //         if (props.redisCached && props.productTypeStr) {
    //             fetcher()
    //         } else {

    //         }
    //     }
    // }, [getCachedError]);

    // console.log("THE START! props.allProducts", props.allProducts);

    let obj;

    if (props.homePageOrAllShopPage === "Homepage Or All Products Shop page") {
        if (props.homePage) {
            obj = [
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
                    randomProducts: props.usingProducts
                }
            ];
        } else {
            obj = [
                {
                    keyStr: "all_products",
                    usingKey: allTheProducts
                },
                {
                    noKey: "empty",
                    evaluationKey: props.allProducts
                }
            ]
        }
    }

    console.log("right above the SWR", props.usingProducts);

    // API?CAHCED WE ARE IN! REQ.body {"set":"foo","value":"get"}
    // API?CAHCED WE ARE IN! TYPEOF req.body string

    // For quick test remove afterwards!
    const cached = async (method, key, value) => {
        console.log("inside the cached", method, key, value);
        const response = await fetch("/api/cached", {
            method: "POST",
            body: JSON.stringify({
                method,
                key,
                value
            })
        });
        console.log("resposne befoer the response.json()", response);
        // if (!response.ok) {
        //     return;
        // }
        const res = await response.json();
        console.log("response before the if block", res);
        if (!response.ok) {
            // console.log("RES ERROR CACHING RETURNS:!, ", res);
            console.log("response WAS NOT OK! inside CACHED function", response);
            // fetcher()
            setCachedProducts(null);
            setFinalCachingStage(0);
            setGetCachedError(true);
            setReSetCaching(1)
            return;
        } else {
            console.log("response was OK! inside CACHED function", res);
            // console.log("RES CACHING RETURNS:!, ", res.redis);
            // console.log("TYPE OF THIS CACHED RESP ", typeof res.redis.result);
            if (!props.redisCached) {
                setMonitorCaching(allTheProducts);
            }
            setCachedProducts(JSON.parse(res.redis.result));
            return;
        }
    }

    useEffect(() => {
        dispatch(allProductsThunk());
    }, []);

    useEffect(() => {
        if (!props.usingProducts) {
            setLocalProductState(10);
        }
    }, []);

    useEffect(() => {
        if (allProductsThunk.length > 0) {
            fetcher(obj);
        }
    }, [allTheProducts]);

    const fetcher = async (input) => {
        if (localProductState) {
            const response = await fetch("/api/redis", {
                method: "POST",
                body: JSON.stringify(input)
            });
            if (!response.ok) {
                return null;
            } else {
                const jsonRespons = await response.json();
                setMonitorCaching(allTheProducts);
                props.setUsingProducts(jsonRespons.usingKey);
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
            idHTML: "product-cards-" + p.id.replace(/[a-z\-]/g, "")
        })));
    }

    const pageArrayFunc = () => {
        dispatch(productArrayChunkSize(props.displayMax));
        let copy;
        if (process?.title === "browser" && window.location.pathname === "/") {
            console.log("are you entering here SHOW URSELF?!")
            const tempArray = props.usingProducts.slice(0, props.displayMax);
            if (media) {
                dispatch(focusSingleProduct(true));
                // dispatch(oneDisplayedProduct(0));
                copy = copyArrayHelper(tempArray, 1);
                ///
                setPageArray(copy);
                console.log("COPY! HOMEPAGE at MEDIA IF statement", media);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(tempArray, props.displayMax);
                setPageArray(copy);
                console.log("COPY! HOMEPAGE at MEDIA ELSE statement", media);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            }
        } else {
            if (media) {
                dispatch(focusSingleProduct(true));
                // dispatch(oneDisplayedProduct(0));
                copy = copyArrayHelper(props.usingProducts, 1);
                setPageArray(copy);
                console.log("COPY! THE OTHER PAGES at MEDIA IF statement", media);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(props.usingProducts, props.displayMax);
                setPageArray(copy);
                console.log("COPY! THE OTHER PAGES at MEDIA ELSE statement", media);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            }
        }
    }

    useEffect(() => {
        dispatch(savePageArrayLength(pageArray.length));
    }, [pageArray]);

    useEffect(() => {
        if (props.usingProducts !== null) {
            pageArrayFunc();
        }
    }, [props.usingProducts, props.categoryPage, process?.title === "browser" && window.location.pathname, props.displayMax, media]);

    useEffect(() => {
        if (!props.redisCached && props.productTypeStr) {
            cached("get", "all_products");
        }
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
        if (reSetCaching && props.redisCached) {
            console.log("are we here at reSetCaching?!")
            const ww = [
                {
                    keyStr: props.productTypeStr,
                    usingKey: cachedProducts
                },
                {
                    noKey: "empty",
                    evaluationKey: displayCategoryList
                }
            ];
            fetcher(ww);
            setFinalCachingStage(1);
            setReSetCaching(0);
        }
    }, [reSetCaching]);

    useEffect(() => {
        if (reSetCaching && !props.redisCached) {

            let ll;
            if (props.homePageOrAllShopPage === "Homepage Or All Products Shop page") {
                if (props.homePage) {
                    ll = [
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
                            randomProducts: props.usingProducts
                        }
                    ];
                } else {
                    ll = [
                        {
                            keyStr: "all_products",
                            usingKey: allTheProducts
                        },
                        {
                            noKey: "empty",
                            evaluationKey: props.allProducts
                        }
                    ]
                }
            }

            fetcher(ll);
            // cached("set", "all_product_randomized", JSON.stringify(randomListedProducts));
            // cached("set", "all_products", JSON.stringify(allTheProducts));
            console.log("DONE IR NOW?!");

            setFinalCachingStage(1);
            setReSetCaching(0);
        }
    }, [reSetCaching]);

    console.log("pageArray in the end what value is it!?", pageArray);
    console.log("pageArray.LENGTH in the end what value is it!?", pageArray.length);
    console.log("ListingCOUNT in the end what value is it!?", listCount);
    console.log("USECALLBACK WORKED!!", domNode);
    console.log("slideShowPressCount is changing?", slideShowPressCount);

    console.log("props.pagePath is server side showing client?");
    console.log("props.pagePath", props.pagePath);
    console.log("props.pagePath is server side showing client?");

    console.log("PATH IN QUERY");
    console.log("window.location.pathname", process.title === "browser" && window.location.pathname);
    console.log("PATH IN QUERY");


    return (
        <>
        {
            pageArray.length > 0 && 
                <section data-white id="feature-product-section" className={styles.feature_section}>
                    <h2>{props.headerText}</h2>
                    <h3>{props.subHeader}</h3>
                    <div ref={featureContainerRef}>
                        {
                            pageArray.length > 0 &&
                            pageArray[listCount].map((item) => <MinitureProductSize item={item} key={item.id} />)
                        }
                    </div>
                </section>
        }
        </>
    );
}

export default Featured;