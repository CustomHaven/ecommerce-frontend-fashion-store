import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/homepage/Home.module.css";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import useQuerySelector from "../../../hooks/useQuerySelector";


const Hero = () => {
    const src = "/assets/ladybanner-removebg.png";
    // const src = "https://ae01.alicdn.com/kf/H1431897478504b3d87aae37cffd6dc02A/New-2021-Men-s-Casual-Jacket-Fashion-Winter-Parkas-Male-Fur-Trench-Thick-Overcoat-Heated-Jackets.jpg";
    const heroRef = useRef(null);
    // const headerRef = useSelector(selectHeaderRef);

    const headerRef = useQuerySelector("#header-elem");

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

    useIntersectionObserver({
        rootMargin: "-40%",
    }, [heroRef], handleIntersect);

    return (
        <>
            <section ref={heroRef} className={styles.heroSection}>
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
                </div>


            </section>
        </>
    );
}


export default Hero; 