import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../styles/Feature.module.css";
import MinitureProductSize from "./minitureProduct";
import { chunkArray } from "../../../utils/generalUtils";
import { selectAllMensProducts,
    selectMensBottom,
    selectMensTop,
    selectAllWomensProducts,
    selectWomensBottom,
    selectWomensTop,
    displayProductCategory,
    selectDisplayCategoryList,
    selectProductListCount, productArrayChunkSize } from "../../../feature/productSlice/productSlice";



const Featured = (props) => {

    const displayCategories = useSelector(selectDisplayCategoryList);
    const listCount = useSelector(selectProductListCount);
    const dispatch = useDispatch();

    // in case props.categoryPage is not null then we know the page we hit is a category and subCategory page so we have these selector states
    // from redux and we pass them to the dispatch(displayProductCategory()) in the switch statement
    // to then use them at displayCategories from the useSelector above
    const allMen = useSelector(selectAllMensProducts);
    const mensBottom = useSelector(selectMensBottom);
    const mensTop = useSelector(selectMensTop);
    const allWomen = useSelector(selectAllWomensProducts);
    const womensBottom = useSelector(selectWomensBottom);
    const womensTop = useSelector(selectWomensTop);

    const [pageArray, setPageArray] = useState([]);


    const pageArrayFunc = () => {
        switch(props.categoryPage) {
            case "ma":
                dispatch(displayProductCategory(allMen));
                break;
            case "mb":
                dispatch(displayProductCategory(mensBottom));
                break;
            case "mt":
                dispatch(displayProductCategory(mensTop));
                break;
            case "wa":
                dispatch(displayProductCategory(allWomen));
                break;
            case "wb":
                dispatch(displayProductCategory(womensBottom));
                break;
            case "wt":
                dispatch(displayProductCategory(womensTop));
                break;
            default:
                if (displayCategories.length > 0) {
                    dispatch(displayProductCategory([]));
                }
                break;
        }

        if (process?.title === "browser" && window.location.pathname === "/") {
            // console.log("home page!!", displayCategories);
            setPageArray(props.products.slice(0, props.displayMax));
        } else {
            if (props.categoryPage !== "") {
                // console.log("NOT home page!! but we are in the category bits", displayCategories);
                setPageArray(chunkArray(displayCategories, props.displayMax));
            } else {
                // console.log("NOT at home page!! and NOT AT category pages checking the props.categoryPage should be emptyString",  props.categoryPage);
                setPageArray(chunkArray(props.products, props.displayMax));
            }
        }
    }

    useEffect(() => {
        pageArrayFunc();
    }, [props.products, props.categoryPage, process?.title === "browser" && window.location.pathname, props.displayMax, displayCategories]);


    dispatch(productArrayChunkSize(pageArray.length));

    return (//
        <>
            <section data-white id="feature-product-section" className={styles.feature_section}>
                <h2>{props.headerText}</h2>
                <h3>New Modern Design Collection</h3>
                <div>
                    {
                        pageArray.length > 0 ?
                        process?.title === "browser" && window.location.pathname === "/"
                        ?
                        pageArray.map((item, index) => <MinitureProductSize item={item} key={item.id} />)
                        :
                        pageArray[listCount].map((item, index) => <MinitureProductSize item={item} key={item.id} />)
                        : null
                        // array.map((item, index) => <MinitureProductSize item={item} key={index} />)
                    }
                </div>
            </section>
        </>
    );
}

export default Featured;