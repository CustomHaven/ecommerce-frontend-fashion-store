import React, { useRef } from "react";
import styles from "../../../styles/Feature.module.css";
import Canvas from "../../canva";
import { BsCart3 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import useQuerySelector from "../../../hooks/useQuerySelector";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { slides } from "../../../utils/slideInHelpers";

// when cart is pressed and item is in cart change BsCart3 to FaCartPlus

const MinitureProductSize = ({item}) => {
    const productSectionRef = useQuerySelector("#feature-product-section");
    const parentSection = productSectionRef.current;
    const productContainerRef = useRef(null);

    useIntersectionObserver({
        root: parentSection,
        rootMargin: "0px",
        threshold: 0
    }, [productContainerRef], slides);


    return (
        <>
            <div ref={productContainerRef} className={styles.imgOuterContainer} >
                <div className={styles.imgInnerContainer}>
                    <Canvas src={item.url} className={styles.imgItem} />
                </div>
                <p>{item.name}</p>
                <BsCart3 className={styles.cart_feature} />
                <p>${item.price}</p>
            </div>
        </>
    );
}

export default MinitureProductSize;