import Head from 'next/head';
import { useState } from 'react';
import { redisGet } from '../utils/redis';
import HiddenHeader from "../components/HiddenHeader";
import Breadcrumbs from "../components/Breadcrumbs";
import CartPage from '../components/cartPage';
import Featured from '../components/productlist_components/featuredProducts';
import { wrapper } from '../store/store';
import { allProductsThunk } from "../feature/productSlice/productSlice";

const Cart = (props) => {
    const [allProducts, setAllProducts] = useState(props.allProducts);
    const [allRandomProducts, setAllRandomProducts] = useState(props.allProductsRandomized);
    console.log("WE SEE THIS FRONTEND?!", typeof allRandomProducts);
    // allTheRandomProducts={allRandomProducts}
    // setAllRandomProducts={setAllRandomProducts}
    return (
        <>
            <Head>
                <title>Haven Cart Page</title>
            </Head>
            <HiddenHeader divideBy={1} />
            {/* <HiddenHeader divideBy={4} /> */}
            <Breadcrumbs divideBy={8} breadcrumbs={["Home", "All Products", "Cart"]} prodId={""} pageType={"cartPage"} />
            <CartPage randomProducts={props.allProductsRandomized}/>
            <Featured 
                allProducts={allProducts}
                usingProducts={allRandomProducts}
                setUsingProducts={setAllRandomProducts}
                displayMax={4}
                headerText={""}
                subHeader={"YOU MIGHT ALSO LIKE"}
                categoryPage={"cart"} />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        // await store.dispatch(allProductsThunk());

        const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk);

        const allRandomProducts = await redisGet("all_products_randomized", store, "products", "allProductsRandomized", allProductsThunk);

        return {
            props: {
                allProducts: JSON.parse(allProducts),
                allProductsRandomized: JSON.parse(allRandomProducts),
            }
        }
    }
);

Cart.layout = "L1";

export default Cart;