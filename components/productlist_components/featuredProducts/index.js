import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRedis from "../../../hooks/useRedis";
import useMediaQuery from "../../../hooks/useMediaQuery"; // this 1 done the trick!
import MinitureProductSize from "./minitureProduct";
import { chunkArray } from "../../../utils/generalUtils";
import { selectProductListCount, productArrayChunkSize, productListCounter,
    focusSingleProduct, oneDisplayedProduct, allProductsThunk,
    selectAllProductsRandomized, selectAllProducts, savePageArrayLength,
    selectSlideShowPressCount, selectAllMensProducts, selectMensTop,
    selectMensBottom, selectAllWomensProducts, selectWomensTop,
    selectWomensBottom, selectDisplayCategoryList } from "../../../feature/productSlice/productSlice";
import { controlProductDirectionHelper, selectProductsDirectionsHelper } from "../../../feature/generalComponents/generalComponentSlice";
import { productCategoriesSeparator, finalSubCatListing } from "../../../utils/subCatHelper";
import styles from "../../../styles/Feature.module.css";


const Featured = (props) => {

    const dispatch = useDispatch();
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
    const slideShowPressCount = useSelector(selectSlideShowPressCount);
    const [domNode, setDomNode] = useState(null);
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

    let width;
    if (props.pageType === "Home") {
        width = 1212;
    } else if (props.pageType === "Product Listing") {
        width = 998;
    }

    const { media } = useMediaQuery(width);

    const [pageArray, setPageArray] = useState([]);

    let arrayObject, second, first;
    if (props.homePage === "Homepage") {
        arrayObject = [ 
            { keyStr: "all_products", evaluationKey: allTheProducts },
            { keyStr: "all_products_randomized", usingKey: randomListedProducts },
            { noKey: "empty", allProducts: props.allProducts, randomProducts: props.usingProducts }
        ];
        first = props.allProducts;
        second = allTheProducts;
    } 
    if (props.allShopPage === "All Shop Page") {
        arrayObject = [ 
            { keyStr: "all_products_randomized", evaluationKey: randomListedProducts },
            { keyStr: "all_products", usingKey: allTheProducts },
            { noKey: "empty", evaluationKey: props.allProducts }
        ];
        first = props.allProducts;
        second = allTheProducts;
    }
    if (props.pageSub === "Sub-category Listing") {
        arrayObject = [ { keyStr: props.pagePath.replace(/\s/, "_"), usingKey: displayCategoryList } ];
        first = props.usingProducts;
        second = displayCategoryList;
    }

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

            const tempArray = props.usingProducts.slice(0, props.displayMax);
            if (media) {
                dispatch(focusSingleProduct(true));
                // dispatch(oneDisplayedProduct(0));
                copy = copyArrayHelper(tempArray, 1);
                ///
                setPageArray(copy);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(tempArray, props.displayMax);
                setPageArray(copy);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            }
        } else {
            if (media) {
                dispatch(focusSingleProduct(true));

                copy = copyArrayHelper(props.usingProducts, 1);
                setPageArray(copy);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            } else {
                dispatch(focusSingleProduct(false));
                dispatch(productListCounter(0));
                copy = copyArrayHelper(props.usingProducts, props.displayMax);
                setPageArray(copy);
                dispatch(controlProductDirectionHelper(productsDirectionsHelper + 1));
            }
        }
    }


    useEffect(() => {
        dispatch(allProductsThunk());
    }, [props.updatePage]);

    useEffect(() => {
        if (!props.usingProducts) {
            if (props.homePage === "Homepage") {
                if (randomListedProducts.length > 0) {
                    props.setUsingProducts(randomListedProducts);
                }
            }
            if (props.allShopPage === "All Shop Page") {
                if (allTheProducts.length > 0) {
                    props.setUsingProducts(allTheProducts);
                }
            }
        }
    }, [allTheProducts, randomListedProducts]);


    useEffect(() => {
        if (allTheProducts && props.pageSub === "Sub-category Listing") {
            productCategoriesSeparator(null, allTheProducts, props.pagePath, setSubCatListing, "", false, dispatch);
        }
    }, [allTheProducts]);

    useEffect(() => {
        if (subCatListing && props.pageSub === "Sub-category Listing") {
            finalSubCatListing(dispatch, props.pagePath, subProductsObj);
        }
    }, [subCatListing, subProductsObj]);

    useEffect(() => {
        if (displayCategoryList) {
            if (props.pageSub === "Sub-category Listing") {
                if (displayCategoryList.length > 0) {
                    props.setUsingProducts(displayCategoryList);
                }
            }
        }
    }, [displayCategoryList]);

    const [ redisState ] = useRedis(arrayObject, first, second, false);

    useEffect(() => {
        if (redisState) {
            props.setUsingProducts(redisState);
        }
    }, [redisState]);

    useEffect(() => {
        dispatch(savePageArrayLength(pageArray.length));
    }, [pageArray]);

    useEffect(() => {
        if (props.usingProducts !== null) {
            pageArrayFunc();
        }
    }, [props.usingProducts, props.categoryPage, process?.title === "browser" && window.location.pathname, props.displayMax, media]);

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