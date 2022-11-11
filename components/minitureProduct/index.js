import React from "react";
import styles from "../../styles/Feature.module.css";
import Canvas from "../canva";
import { BsCart3 } from "react-icons/bs";

// when cart is pressed and item is in cart change BsCart3 to FaCartPlus

const MinitureProductSize = ({item}) => {
    return (
        <>
            <div className={styles.imgOuterContainer} >
                <div className={styles.imgInnerContainer}>
                    <Canvas src={item.url} className={styles.imgItem} />
                </div>
                <h3>{item.name}</h3>
                <BsCart3 className={styles.cart_feature} />
                <h3>${item.price}</h3>
            </div>
        </>
    );
}

export default MinitureProductSize;