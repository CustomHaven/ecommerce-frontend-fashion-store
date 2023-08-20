import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "../../../hooks/useMediaQuery"; // this 1 done the trick!
import styles from "../../../styles/Feature.module.css";
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


    const fetcher = async (input) => {
        const response = await fetch("/api/redis", {
            method: "POST",
            body: JSON.stringify(input)
        });
        if (!response.ok) {
            return null;
        } else {
            const jsonRespons = await response.json();
            props.setUsingProducts(jsonRespons.usingKey);
            return;
        }
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
        dispatch(allProductsThunk());
    }, [props.updatePage]);


    useEffect(() => {
        if (allTheProducts && props.pageSub === "Sub-category Listing") {
            console.log("inside the productCategoriesSeparator");
            productCategoriesSeparator(null, allTheProducts, props.pagePath, setSubCatListing, "", false, dispatch);
        }
    }, [allTheProducts]);

    useEffect(() => {
        if (subCatListing && props.pageSub === "Sub-category Listing") {
            console.log("next stage subCatListing we have value of", subCatListing);
            finalSubCatListing(dispatch, props.pagePath, subProductsObj);
        }
    }, [subCatListing, subProductsObj]);

    useEffect(() => {
        if (allTheProducts && props.homePageOrAllShopPage === "Homepage Or All Products Shop page") {
            let obj;
            if (JSON.stringify(allTheProducts) !== JSON.stringify(props.allProducts)) {

                if (props.homePage === "Homepage") {
                    obj = [
                        {
                            keyStr: "all_products",
                            evaluationKey: allTheProducts
                        },
                        {
                            keyStr: "all_products_randomized",
                            usingKey: randomListedProducts
                        },
                        {
                            noKey: "empty",
                            allProducts: props.allProducts,
                            randomProducts: props.usingProducts
                        }
                    ];
                } else {
                    obj = [
                        {
                            keyStr: "all_products_randomized",
                            evaluationKey: randomListedProducts
                        },
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
                fetcher(obj);
            } else {
                console.log("redis is uptodate no change needed!");
            }
        }
    }, [allTheProducts]);

    useEffect(() => {
        if (displayCategoryList && props.pageSub === "Sub-category Listing") {
            if (JSON.stringify(displayCategoryList) !== JSON.stringify(props.usingProducts)) {
                console.log("We are updating the redis for sub listing products");
                let obj = [
                    {
                        keyStr: props.pagePath.replace(/\s/, "_"),
                        usingKey: displayCategoryList
                    }                
                ]
                fetcher(obj);
            } else {
                console.log("No need for update sub listing is uptodate redis");
            }
        }
    }, [displayCategoryList]);

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