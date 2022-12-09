import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Feature.module.css";
import MinitureProductSize from "./minitureProduct";
import { listOfAllMenProducts, listWomensTop, selectProductListCount, productArrayChunkSize } from "../../feature/productSlice/productSlice";
import { chunkArray } from "../../utils/generalUtils";


const Featured = (props) => {

    // console.log("window address url", process?.title === "browser" && window.location.pathname);
    let array;
    if (process?.title === "browser" && window.location.pathname === "/") {
        array = props.products.slice(0, props.displayMax);
    } else {
        array = chunkArray(props.products, props.displayMax);
    }

    const [pageArray] = useState(array);
    const listCount = useSelector(selectProductListCount);

    const dispatch = useDispatch();
    // dispatch(listOfAllMenProducts(props.products));
    // dispatch(listWomensTop(props.products));

    dispatch(productArrayChunkSize(pageArray.length));

    useEffect(() => {

    }, [props.products, array, pageArray]);


    return (//
        <>
            <section data-white id="feature-product-section" className={styles.feature_section}>
                <h2>{props.headerText}</h2>
                <h3>New Modern Design Collection</h3>
                <div>
                    {
                        process?.title === "browser" && window.location.pathname === "/" 
                        ?
                        pageArray.map((item, index) => <MinitureProductSize item={item} key={item.id} />)
                        :
                        pageArray[listCount].map((item, index) => <MinitureProductSize item={item} key={item.id} />)
                        // array.map((item, index) => <MinitureProductSize item={item} key={index} />)
                    }
                </div>
            </section>
        </>
    );
}

export default Featured;