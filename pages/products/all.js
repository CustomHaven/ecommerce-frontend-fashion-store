import Head from "next/head";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redisGet } from "../../utils/redis";
import HiddenHeader from "../../components/HiddenHeader";
import AsideMenu from "../../components/productlist_components/asideMenu";
import FeatureProducts from "../../components/productlist_components/featuredProducts";
import Directions from "../../components/productlist_components/directions";
import { wrapper } from "../../store/store";
import { allProductsThunk, selectDisplayMax, productDisplayMax } from "../../feature/productSlice/productSlice";


const AllProducts = (props) => {

    if (process.title === "browser" && window.location.pathname === "/") {
        console.log("empty pathname?");
        return;
    }
    const dispatch = useDispatch();

    const [allProducts] = useState(props.allProducts);
    const [usingProducts, setUsingProducts] = useState(props.allProducts);

    dispatch(productDisplayMax(6));
    const displayMax = useSelector(selectDisplayMax);
    return (
        <>
            <Head>
                <title>Fashion All Products</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                <AsideMenu />
                <FeatureProducts
                    allProducts={allProducts}
                    usingProducts={usingProducts}
                    setUsingProducts={setUsingProducts}
                    displayMax={displayMax}
                    headerText={"All Products"}
                    subHeader={"New Modern Design Collection"}
                    categoryPage={""}
                    pageType={"Product Listing"}
                    homePageOrAllShopPage={"Homepage Or All Products Shop page"}
                    allShopPage={"All Shop Page"}
                    updatePage={"All Products"} />
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {

        store.dispatch(productDisplayMax(6));
        const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk, true);
        const allRandomProducts = await redisGet("all_products_randomized", store, "products", "allProductsRandomized", allProductsThunk);

        return {
            props: {
                allProducts: typeof allProducts === "object" ? allProducts : JSON.parse(allProducts),
                allRandomProducts: typeof allRandomProducts === "object" ? allRandomProducts : JSON.parse(allRandomProducts),
                displayMax: store.getState().products.displayMax
            }
        }
    }
);

AllProducts.layout = "L1";

export default AllProducts;