import React, { useState, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Canvas from "../canva";
import { selectHeaderRef } from "../../feature/generalComponents/generalComponentSlice";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useQuerySelector from "../../hooks/useQuerySelector";
import useWindowDimensions from "../../hooks/useWindowDimensions";


const Hero = () => {
    const src = "/assets/ladybanner-removebg.png";
    // const src = "https://ae01.alicdn.com/kf/H1431897478504b3d87aae37cffd6dc02A/New-2021-Men-s-Casual-Jacket-Fashion-Winter-Parkas-Male-Fur-Trench-Thick-Overcoat-Heated-Jackets.jpg";
    const [width] = useState(820);
    const [height] = useState(951);
    const heroRef = useRef(null);
    // const headerRef = useSelector(selectHeaderRef);
    const { windowWidth } = useWindowDimensions();

    const headerRef = useQuerySelector("#header-elem");




    const handleIntersect = entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            headerRef.current.style.boxShadow = "none";
            headerRef.current.style.backgroundColor = "transparent";
            // headerRef.current.style.backgroundColor = "blue";
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
                    <h2>Super value deals</h2>
                    <h1>On all products</h1>
                    <h3>Save more with coupons</h3>
                    <div className={styles.shop_now_wrap}>
                        <Link href="/#"><button className={styles.shop_now_button}>Shop now</button></Link>
                    </div>
                </div>

                <div className={styles.imgContainer}>
                    <Image priority src={src} fill contain="true" alt="Lady Banner" className={styles.hero_banner_img} />
                    {/* <Canvas src={src} className={styles.hero_banner_img} /> */}
                    {/* <Canvas src={src} width={820} height={950} className={styles.ladyImg} /> */}
                </div>


            </section>
        </>
    );
}


export default Hero; 