import Head from 'next/head';
import HiddenHeader from "../components/HiddenHeader";
import Breadcrumbs from "../components/Breadcrumbs";
import CartPage from '../components/cartPage';
import Featured from '../components/productlist_components/featuredProducts';
import { wrapper } from '../store/store';
import { allProductsThunk } from "../feature/productSlice/productSlice";

const Cart = (props) => {

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
                products={props.allProductsRandomized}
                displayMax={4}
                headerText={""}
                subHeader={"YOU MIGHT ALSO LIKE"}
                categoryPage={"cart"} />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        await store.dispatch(allProductsThunk());

        return {
            props: {
                allProducts: store.getState().products.allProducts,
                allProductsRandomized: store.getState().products.allProductsRandomized
            }
        }
    }
);

Cart.layout = "L1";

export default Cart;