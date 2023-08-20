import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import redis, { redisGet } from "../../../utils/redis";
import Error from "../../_error";
import HiddenHeader from "../../../components/HiddenHeader";
import AsideMenu from "../../../components/productlist_components/asideMenu";
import FeatureProducts from "../../../components/productlist_components/featuredProducts";
import Directions from "../../../components/productlist_components/directions";
import { wrapper } from "../../../store/store";
import { allProductsThunk, productDisplayMax, selectAllProducts } from "../../../feature/productSlice/productSlice";
import { productCategoriesSeparator } from "../../../utils/subCatHelper";


const SubCat = (props) => {

    if (props.error) {
        return <Error statusCode={404} resetValues={true} />
    }

    const teProducts = useSelector(selectAllProducts);

    const [allProducts] = useState(props.productCategory);
    const [usingProducts, setUsingProducts] = useState(props.productCategory);

    return (
        <>
            <Head>
                <title>Haven {props.displayText} Products</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                <AsideMenu />
                <FeatureProducts 
                    allProducts={allProducts}
                    usingProducts={usingProducts}
                    setUsingProducts={setUsingProducts}
                    displayMax={props.displayMax}
                    headerText={props.displayText}
                    subHeader={"New Modern Design Collection"}
                    categoryPage={props.symbolHolder}
                    pageType={"Product Listing"}
                    pageSub={"Sub-category Listing"}
                    pagePath={props.pagePath}
                    theProductsAll={teProducts}
                    redisCached={props.redisCached}
                    productTypeStr={props.productTypeStr}
                    updatePage={props.symbolHolder}
                />
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        const query = ctx.query;
        const cat = ["men", "women"];
        const sub = ["all", "top", "bottom"];
        let error;
        if (cat.find(v => v === query.category.toLowerCase()) === undefined || sub.find(v => v === query.subcat.toLowerCase()) === undefined  ) {
            error = true;
        } else {
            error = false;
        }

        if (error) {
            return {
                props: {
                    error
                }
            }
        }
    
        const pagePath = query.category.toLowerCase() + " " + query.subcat.toLowerCase();

        const textDisplay = pagePath.replace(/(^[m|w])(\w+)\s([t|b|a])(\w+$)/i, (all, b, c, d, e) => {
            return b.toUpperCase() + c.toLowerCase() + "'s " + d.toUpperCase() + e.toLowerCase();
        });


        let productCategory = null, symbolHolder = "", productCategoryF;

        const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk, true);

        store.dispatch(productDisplayMax(6));

        const catListRedis = await redis.get(pagePath.replace(/\s/, "_"), async (err, items) => {
            if (err) console.log("we have err in redis for some reasons.", err);
            if (items) {
                return items;
            } else {
                productCategoryF = productCategoriesSeparator(store, allProducts, pagePath, productCategory, symbolHolder, true);
                await redis.set(productCategoryF.keyPagePath, JSON.stringify(productCategoryF.productCategory));
                console.log("WE ARE SETTING THE productCategoryF IN REDIS SET! WORKS", productCategoryF);
                return productCategoryF;
            }
        });

        let productTypeStr;
        if (pagePath.match(/all/)) {
            productTypeStr = textDisplay.replace(/[\'](\w) .+$/, "$1");
        } else {
            productTypeStr = textDisplay.replace(/'/, "");
        }

        return {
            props: {
                allProducts: typeof allProducts === "object" ? allProducts : JSON.parse(allProducts),
                displayMax: store.getState().products.displayMax,
                symbolHolder: catListRedis === null ? productCategoryF.symbolHolder : pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2").toLowerCase(),
                pagePath: pagePath,
                displayText: textDisplay,
                productCategory: catListRedis === null ? productCategoryF.productCategory : JSON.parse(catListRedis),
                redisCached: catListRedis !== null ? true : false,
                productTypeStr: productTypeStr,
                error: error
            }
        }
    }
);

SubCat.layout = "L1";

export default SubCat;