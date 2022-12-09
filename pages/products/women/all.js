import React, { useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import HiddenHeader from "../../../components/HiddenHeader";
import AsideMenu from "../../../components/asideMenu";
import FeatureProducts from "../../../components/featuredProducts";
import Directions from "../../../components/directions";
import { useSelector, useDispatch } from "react-redux";
import { 
    selectAllWomensProducts, allProductsThunk, 
    selectDisplayMax, productDisplayMax, 
    listOfAllWomenProducts } from "../../../feature/productSlice/productSlice";
import { wrapper } from "../../../store/store";


const AllProducts = (props) => {
    const dispatch = useDispatch();
    dispatch(productDisplayMax(6));
    dispatch(listOfAllWomenProducts(props.allProducts));
    const allProducts = useSelector(selectAllWomensProducts);
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
                <FeatureProducts products={allProducts} displayMax={displayMax} headerText={"Womens"} />
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        await store.dispatch(allProductsThunk());

        // store.dispatch(productDisplayMax(6));

        return {
            props: {
                allProducts: store.getState().products.allProducts,
                displayMax: store.getState().products.displayMax
            }
        }
    }
);

export default AllProducts;