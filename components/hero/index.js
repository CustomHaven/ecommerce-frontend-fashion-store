import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Canvas from "../canva";
import { selectHeaderRef } from "../../feature/generalComponents/generalComponentSlice";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useQuerySelector from "../../hooks/useQuerySelector";
import useWindowDimensions from "../../hooks/useWindowDimensions";


const Hero = () => {
    const [src] = useState("assets/ladybanner-removebg.png");
    const [width] = useState(820);
    const [height] = useState(951);
    const heroRef = useRef(null);
    // const headerRef = useSelector(selectHeaderRef);
    const { windowWidth } = useWindowDimensions();

    const headerRef = useQuerySelector("#header-elem");

    console.log("querySelector HeaderRef", headerRef);


    const handleIntersect = entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            headerRef.current.style.boxShadow = "none";
            headerRef.current.style.backgroundColor = "transparent";
        } else {
            headerRef.current.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
            headerRef.current.style.backgroundColor = "white";
        }
    };

    // if (windowWidth > 700) {
        useIntersectionObserver({
            rootMargin: "-30%",
        }, heroRef, handleIntersect);
    // }

    // }

    return (
        <>
            <section ref={heroRef} className={styles.heroSection}>
            {/* <section className={styles.heroSection} style={{width: "100vw", margin: "-300px 0px 0px 0px"}}> */}
                <div className={styles.heroText}>
                    <h3>Trade-in-offer</h3>
                    <h1>Super value deals</h1>
                    <h1>On all products</h1>
                    <h3>Save more with coupons</h3>
                    <div className={styles.shop_now_wrap}>
                        <Link href="/all-products"><button className={styles.shop_now_button}>Shop now</button></Link>
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