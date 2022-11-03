import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import Canvas from "../canva";


const Hero = () => {
    const [src] = useState("assets/ladybanner-removebg.png");
    const [width] = useState(820);
    const [height] = useState(951);
    // const ss = "https://images.unsplash.com/photo-1601762603339-fd61e28b698a";
    //"https://ae01.alicdn.com/kf/H1431897478504b3d87aae37cffd6dc02A/New-2021-Men-s-Casual-Jacket-Fashion-Winter-Parkas-Male-Fur-Trench-Thick-Overcoat-Heated-Jackets.jpg";

    return (
        <>
            <section className={styles.heroSection}>
                <div className={styles.heroText}>
                    <h3>Trade-in-offer</h3>
                    <h1>Super value deals</h1>
                    <h1>On all products</h1>
                    <h3>Save more with coupons</h3>
                    <div className={styles.shop_now_wrap}>
                        <button className={styles.shop_now_button}>Shop now</button>
                    </div>
                </div>

                <div className={styles.imgContainer}>
                    <Canvas src={src} width={width} height={height} className={styles.ladyImg} />
                </div>


            </section>
        </>
    );
}


export default Hero; 