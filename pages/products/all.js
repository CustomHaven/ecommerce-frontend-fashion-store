import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import HiddenHeader from "../../components/HiddenHeader";
import AsideMenu from "../../components/productlist_components/asideMenu";
import FeatureProducts from "../../components/productlist_components/featuredProducts";
import Directions from "../../components/productlist_components/directions";
import { wrapper } from "../../store/store";
import { selectAllProducts, allProductsThunk, selectDisplayMax, productDisplayMax } from "../../feature/productSlice/productSlice";
import { useRouter } from "next/dist/client/router";



const AllProducts = () => {
    console.log(window.location.pathname);
    if (process.title === "browser" && window.location.pathname === "/") {
        console.log("empty pathname?");
        return;
    }

    const allProducts = useSelector(selectAllProducts);
    const dispatch = useDispatch();
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
                <FeatureProducts products={allProducts} displayMax={displayMax} headerText={"All Products"} categoryPage={""} />
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