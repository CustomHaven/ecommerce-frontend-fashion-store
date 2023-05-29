import Head from "next/head";
import Error from "../../_error";
import HiddenHeader from "../../../components/HiddenHeader";
import AsideMenu from "../../../components/productlist_components/asideMenu";
import FeatureProducts from "../../../components/productlist_components/featuredProducts";
import Directions from "../../../components/productlist_components/directions";
import { wrapper } from "../../../store/store";
import {
    allProductsThunk, productDisplayMax, 
    listOfAllMenProducts, listMensBottoms, listMensTop,
    listOfAllWomenProducts, listWomensBottoms, listWomensTop
} from "../../../feature/productSlice/productSlice";


const SubCat = (props) => {

    if (props.symbolHolder === "") {
        return <Error statusCode={404} resetValues={true} />
    }

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
                props.allProducts.length > 0 ?
                
                <FeatureProducts 
                    products={props.displayProductCategory}
                    displayMax={props.displayMax}
                    headerText={props.displayText}
                    subHeader={"New Modern Design Collection"}
                    categoryPage={props.symbolHolder}
                    pageType={"Product Listing"}
                />
                : null
                }
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        const query = ctx.query;

        await store.dispatch(allProductsThunk());

        const allProducts = store.getState().products.allProducts;
        const pagePath = query.category.toLowerCase() + " " + query.subcat.toLowerCase();

        const textDisplay = pagePath.replace(/(^[m|w])(\w+)\s([t|b|a])(\w+$)/i, (all, b, c, d, e) => {
            return b.toUpperCase() + c.toLowerCase() + "'s " + d.toUpperCase() + e.toLowerCase();
        });

        let displayProductCategory = null, symbolHolder = "";
        const productCategoriesSeparator = () => {
            switch (pagePath) {
                case "men all":
                    symbolHolder = "ma";
                    store.dispatch(listOfAllMenProducts(allProducts));
                    displayProductCategory = store.getState().products.allMenProducts;
                    break;
                case "men bottom":
                    symbolHolder = "mb";
                    store.dispatch(listMensBottoms(allProducts));
                    displayProductCategory = store.getState().products.mensBottom;
                    break;
                case "men top":
                    symbolHolder = "mt";
                    store.dispatch(listMensTop(allProducts));
                    displayProductCategory = store.getState().products.mensTop;
                    break;
                case "women all":
                    symbolHolder = "wa";
                    store.dispatch(listOfAllWomenProducts(allProducts));
                    displayProductCategory = store.getState().products.allWomenProducts;
                    break;
                case "women bottom":
                    symbolHolder = "wb";
                    store.dispatch(listWomensBottoms(allProducts));
                    displayProductCategory = store.getState().products.womensBottom;
                    break;
                case "women top":
                    symbolHolder = "wt";
                    store.dispatch(listWomensTop(allProducts));
                    displayProductCategory = store.getState().products.womensTop;
                    break;
                default:
                    displayProductCategory = null;
                    symbolHolder = "";
                    break;
            }
        }

        store.dispatch(productDisplayMax(6));
        productCategoriesSeparator();

        return {
            props: {
                allProducts: store.getState().products.allProducts,
                displayMax: store.getState().products.displayMax,
                symbolHolder: symbolHolder,
                pagePath: pagePath,
                displayText: textDisplay,
                displayProductCategory: displayProductCategory
            }
        }
    }
);

SubCat.layout = "L1";

export default SubCat;