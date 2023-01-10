import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import HiddenHeader from "../../../components/HiddenHeader";
import AsideMenu from "../../../components/productlist_components/asideMenu";
import FeatureProducts from "../../../components/productlist_components/featuredProducts";
import Directions from "../../../components/productlist_components/directions";
import { wrapper } from "../../../store/store";
import {
    selectDisplayCategoryList,
    allProductsThunk, 
    selectDisplayMax, productDisplayMax, 
    listOfAllMenProducts, listMensBottoms, listMensTop,
    listOfAllWomenProducts, listWomensBottoms, listWomensTop
} from "../../../feature/productSlice/productSlice";


const SubCat = (props) => {
    const categoryListProducts = useSelector(selectDisplayCategoryList);
    const router = useRouter();
    const { category } = router.query;
    const { subcat } = router.query;

    if (category === "" && subcat === "") {
        return;
    }

    const [displayText, setDisplayText] = useState("");
    const [symbolHolder, setSymbolHolder] = useState("");

    const displayMax = useSelector(selectDisplayMax);

    const [pagePath, setPagePath] = useState("");

    const dispatch = useDispatch();
    dispatch(productDisplayMax(6));

    const masterFunc = () => {
        setPagePath(category.toLowerCase() + " " + subcat.toLowerCase());

        switch (pagePath) {
            case "men all":
                setSymbolHolder("ma");
                dispatch(listOfAllMenProducts(props.allProducts));
                break;
            case "men bottom":
                setSymbolHolder("mb");
                dispatch(listMensBottoms(props.allProducts));
                break;
            case "men top":
                setSymbolHolder("mt");
                dispatch(listMensTop(props.allProducts));
                break;
            case "women all":
                setSymbolHolder("wa");
                dispatch(listOfAllWomenProducts(props.allProducts));
                break;
            case "women bottom":
                setSymbolHolder("wb");
                dispatch(listWomensBottoms(props.allProducts));
                break;
            case "women top":
                setSymbolHolder("wt");
                dispatch(listWomensTop(props.allProducts));
                break;
            default:
                // console.log("nothing inside the page was returned! DO ERROR PAGE!!!!");
                break;
        }

        setDisplayText(pagePath.replace(/(^[m|w])(\w+)\s([t|b|a])(\w+$)/i, (all, b, c, d, e) => {
            return b.toUpperCase() + c.toLowerCase() + "'s " + d.toUpperCase() + e.toLowerCase();
        }));
        // return;

    }
    useEffect(() => {
        masterFunc();
    }, [pagePath, symbolHolder, displayText, category, subcat]);


    return (
        <>
            <Head>
                <title>Haven {displayText} Products</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                <AsideMenu />
                {
                props.allProducts.length > 0 ?
                
                <FeatureProducts products={categoryListProducts} displayMax={displayMax} headerText={displayText} categoryPage={symbolHolder} />
                : null
                }
                <Directions />
            </>
        </>   
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        await store.dispatch(allProductsThunk());

        return {
            props: {
                allProducts: store.getState().products.allProducts,
                displayMax: store.getState().products.displayMax
            }
        }
    }
);

// export function getServerSideProps(ctx) {
//   const { params } = ctx;
//   const { id } = params;

//   return {
//     props: {
//       // Pass id as key here, remember that the file name is [id].tsx
//       key: id
//     }, // will be passed to the page component as props
//   };
// }

export default SubCat;