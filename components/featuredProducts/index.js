import React from "react";
import styles from "../../styles/Feature.module.css";
import MinitureProductSize from "../minitureProduct";


const Featured = () => {
    const url = "https://ae01.alicdn.com/kf/H1431897478504b3d87aae37cffd6dc02A/New-2021-Men-s-Casual-Jacket-Fashion-Winter-Parkas-Male-Fur-Trench-Thick-Overcoat-Heated-Jackets.jpg";
    const price = 89.99;
    const name = "Leather Jacket";

    const array = new Array(3).fill({
        url,
        name,
        price
    });

    return (
        <>
            <section className={styles.feature_section}>
                <h2>Featured Products</h2>
                <p>New Modern Design Collection</p>
                <div>
                    {
                        array.map((item, index) => <MinitureProductSize item={item} key={index} />)
                    }
                </div>
            </section>
        </>
    );
}

export default Featured;