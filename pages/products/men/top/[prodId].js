import React, { useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import HiddenHeader from "../../../../components/HiddenHeader";
import AsideMenu from "../../../../components/asideMenu";
import FeatureProducts from "../../../../components/featuredProducts";
import Directions from "../../../../components/directions";
import { useSelector, useDispatch } from "react-redux";
import { 
    selectAllMensProducts, allProductsThunk, 
    selectDisplayMax, productDisplayMax, 
    listOfAllMenProducts, singleProductThunk } from "../../../../feature/productSlice/productSlice";
import { wrapper } from "../../../../store/store";
// import { wrapper } from "../../../../../store/store";



const SingleProduct = (props, second) => {
    console.log(props);
    console.log("second prop", second);
    console.log("inside SingleProduct", window.location.pathname.match(/\w+-\d$/g).join(""));
    return (
        <>
            <Head>
                <title>Fashion All Products</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                {/* <AsideMenu /> */}
                <div><p>Hello prod number</p></div>
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store, context) => async () => {
        // await store.dispatch(allProductsThunk());

        // await store
        
        console.log("context serverSideProp", context);
        // below dont work as this is Server side and title browser is always false!
        // console.log("Inside getServerSideProps", process?.title === "browser" && window.location.pathname.match(/\w+-\d$/g).join(""));
        // store.dispatch(productDisplayMax(6));

        return {
            props: {
                allProducts: store.getState().products.allProducts,
                displayMax: store.getState().products.displayMax
            }
        }
    }
);

export default SingleProduct;