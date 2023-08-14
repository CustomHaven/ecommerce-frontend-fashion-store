import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { redisGet } from "../../../utils/redis";
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
import { productCategoriesSeparator } from "../../../utils/subCatHelper";


const SubCat = (props) => {

    if (props.symbolHolder === "") {
        return <Error statusCode={404} resetValues={true} />
    }

    const catList = useSelector(selectDisplayCategoryList);
    const teProducts = useSelector(selectAllProducts);

    console.log("catList!", catList);
    console.log("DO STORE??");
    console.log(doStore);
    console.log("DO STORE DONE?!");

    console.log("TEPRODUCTS");
    console.log(teProducts);
    console.log("TEPRODUCTS");


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
                    pagePath={props.pagePath}
                    theProductsAll={teProducts}
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

        const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk);


        // await store.dispatch(allProductsThunk());

        // const allProducts = store.getState().products.allProducts;
        const pagePath = query.category.toLowerCase() + " " + query.subcat.toLowerCase();

        const textDisplay = pagePath.replace(/(^[m|w])(\w+)\s([t|b|a])(\w+$)/i, (all, b, c, d, e) => {
            return b.toUpperCase() + c.toLowerCase() + "'s " + d.toUpperCase() + e.toLowerCase();
        });

        let productCategory = null, symbolHolder = "";
        // const productCategoriesSeparator = (paramStore) => {
        //     symbolHolder = pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2").toLowerCase();
        //     if (!allProducts) {
        //         console.log("textDisplay", textDisplay);
        //         console.log("pagePath", pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2"));
                
        //         productCategory = []
        //         return;
        //     }
        //     console.log("paramStore!", paramStore);
        //     switch (pagePath) {
        //         case "men all":
        //             paramStore.dispatch(listOfAllMenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
        //             productCategory = paramStore.getState().products.allMenProducts;
        //             paramStore.dispatch(displayProductCategory(productCategory));
        //             break;
        //         case "men bottom":
        //             paramStore.dispatch(listMensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
        //             productCategory = paramStore.getState().products.mensBottom;
        //             paramStore.dispatch(displayProductCategory(productCategory));
        //             break;
        //         case "men top":
        //             paramStore.dispatch(listMensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
        //             productCategory = paramStore.getState().products.mensTop;
        //             paramStore.dispatch(displayProductCategory(productCategory));
        //             break;
        //         case "women all":
        //             paramStore.dispatch(listOfAllWomenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
        //             productCategory = paramStore.getState().products.allWomenProducts;
        //             paramStore.dispatch(displayProductCategory(productCategory));
        //             break;
        //         case "women bottom":
        //             paramStore.dispatch(listWomensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
        //             productCategory = paramStore.getState().products.womensBottom;
        //             paramStore.dispatch(displayProductCategory(productCategory));
        //             break;
        //         case "women top":
        //             paramStore.dispatch(listWomensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
        //             productCategory = paramStore.getState().products.womensTop;
        //             paramStore.dispatch(displayProductCategory(productCategory));
        //             break;
        //         default:
        //             productCategory = null;
        //             symbolHolder = "";
        //             break;
        //     }
        // }

        store.dispatch(productDisplayMax(6));
        const productCategoryF = productCategoriesSeparator(store, allProducts, pagePath, productCategory, symbolHolder);

        return {
            props: {
                allProducts: typeof allProducts === "object" ? allProducts : JSON.parse(allProducts),
                displayMax: store.getState().products.displayMax,
                symbolHolder: productCategoryF.symbolHolder,
                pagePath: pagePath,
                displayText: textDisplay,
                productCategory: productCategoryF.productCategory.length === 0 ? productCategoryF.productCategory : store.getState().products.displayCategoryList,
                // store: store,
                // productCategoriesSeparator: productCategoriesSeparator
            }
        }
    }
);

SubCat.layout = "L1";

export default SubCat;