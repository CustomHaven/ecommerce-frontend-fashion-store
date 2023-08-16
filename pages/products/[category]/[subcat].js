import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import redis, { redisGet } from "../../../utils/redis";
import Error from "../../_error";
import HiddenHeader from "../../../components/HiddenHeader";
import AsideMenu from "../../../components/productlist_components/asideMenu";
import FeatureProducts from "../../../components/productlist_components/featuredProducts";
import Directions from "../../../components/productlist_components/directions";
import { wrapper, doStore } from "../../../store/store";
import {
    allProductsThunk, productDisplayMax, 
    listOfAllMenProducts, listMensBottoms, listMensTop,
    listOfAllWomenProducts, listWomensBottoms, listWomensTop,
    displayProductCategory, selectDisplayCategoryList, selectAllProducts
} from "../../../feature/productSlice/productSlice";
import { changeSubCatPathLocation } from "../../../feature/generalComponents/generalComponentSlice";
import { productCategoriesSeparator } from "../../../utils/subCatHelper";


const SubCat = (props) => {

    if (props.symbolHolder === "") {
        return <Error statusCode={404} resetValues={true} />
    }
    const dispatch = useDispatch();

    const catList = useSelector(selectDisplayCategoryList);
    const teProducts = useSelector(selectAllProducts);

    console.log("catList!", catList);
    console.log("DO STORE??");
    console.log(catList);
    console.log("DO STORE DONE?!");

    console.log("redisCached");
    console.log(props.redisCached);
    console.log("redisCached");


    console.log("props.pagePath is server side showing client?");
    console.log("props.pagePath", props.pagePath);
    console.log("props.pagePath is server side showing client?");

    // dispatch(changeSubCatPathLocation(props.pagePath));


    const [allProducts, setAllProducts] = useState(props.productCategory);
    const [usingProducts, setUsingProducts] = useState(props.productCategory);

    // useEffect(() => {
    //     productCategoriesSeparator(doStore, teProducts, props.pagePath, null, "");
    // }, [teProducts])

    return (
        <>
            <Head>
                <title>Haven {props.displayText} Products</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                <AsideMenu />
                {
                // props.allProducts.length > 0 ?
                
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
                />
                // : null
                }
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        const query = ctx.query;
        const pagePath = query.category.toLowerCase() + " " + query.subcat.toLowerCase();
        console.log("pagePath server LEVEL is fine!?", pagePath);
        const textDisplay = pagePath.replace(/(^[m|w])(\w+)\s([t|b|a])(\w+$)/i, (all, b, c, d, e) => {
            return b.toUpperCase() + c.toLowerCase() + "'s " + d.toUpperCase() + e.toLowerCase();
        });


        let productCategory = null, symbolHolder = "", productCategoryF;

        const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk, true);

        store.dispatch(productDisplayMax(6));

        const catListRedis = await redis.get(pagePath.replace(/\s/, "_"), async (err, items) => {
            if (err) console.log("we have err in redis for some reasons.", err);
            if (items) {
                console.log("is the items found SUBCATS!?!");
                console.log("items I CAN LITERALLY SEE THE ITEMS OF SUBCATS REDIS SO I HAVE THE VALUE!!", items.length);
                return items;
            } else {
                productCategoryF = productCategoriesSeparator(store, allProducts, pagePath, productCategory, symbolHolder, true);
                await redis.set(productCategoryF.keyPagePath, JSON.stringify(productCategoryF.productCategory));
                console.log("WE ARE SETTING THE productCategoryF IN REDIS SET! WORKS", productCategoryF);
                return productCategoryF;
            }
        });

        console.log("FROM REDIS WE HAVE!", catListRedis);

        console.log("textDisplay", pagePath);

        console.log("Does page path contain all?", pagePath.match(/all/));
        let productTypeStr;
        if (pagePath.match(/all/)) {
            productTypeStr = textDisplay.replace(/[\'](\w) .+$/, "$1");
        } else {
            productTypeStr = textDisplay.replace(/'/, "");
        }

        console.log("We have the wanted STR productTypeStr", productTypeStr);




        return {
            props: {
                allProducts: typeof allProducts === "object" ? allProducts : JSON.parse(allProducts),
                displayMax: store.getState().products.displayMax,
                symbolHolder: catListRedis === null ? productCategoryF.symbolHolder : pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2").toLowerCase(),
                pagePath: pagePath,
                displayText: textDisplay,
                productCategory: catListRedis === null ? productCategoryF.productCategory : JSON.parse(catListRedis),
                redisCached: catListRedis !== null ? true : false,
                productTypeStr: productTypeStr
                // store: store,
                // productCategoriesSeparator: productCategoriesSeparator
            }
        }
    }
);

SubCat.layout = "L1";

export default SubCat;