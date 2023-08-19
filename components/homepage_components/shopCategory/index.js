import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "../../../styles/homepage/ShopCategory.module.css";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { slides } from "../../../utils/slideInHelpers";

const ShopCategory = () => {

    const [bigScreen, setBigScreen] = useState(true);
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const { windowWidth } = useWindowDimensions();

    useIntersectionObserver({
        root: containerRef.current,
        rootMargin: "0px",
        treshold: 0.7
    }, [leftRef, rightRef], slides);


    useEffect(() => {
        if (windowWidth > 1000) {
            setBigScreen(true);
        } else {
            setBigScreen(false);
        }
    }, [bigScreen]);

    return (
        <section className={styles.shop_category_section}>
            <h2>Shop</h2>
            <div ref={containerRef}>
                <div ref={leftRef} data-left={!bigScreen ? "left" : null} data-delay={!bigScreen ? "0.3s" : "0.3s"}>
                    <Link href="products/men/all" className={styles.shop_category_link}>
                        <div className={styles.shop_img_container}>
                            <Image src="/assets/man_standing_LED.jpg" fill contain="true" alt="men's shopping" />
                        </div>
                    </Link>
                    <Link href="products/men/all" className={styles.shop_category_link}>
                        <h3>Men's</h3>
                    </Link>
                </div>
                <div ref={rightRef} data-right={!bigScreen ? "right" : null} data-delay={!bigScreen ? "0.6s" : "0.3s"}>
                    <Link href="products/women/all" className={styles.shop_category_link} >
                        <div className={styles.shop_img_container}>
                            <Image src="/assets/woman-touching-hair.jpg" fill contain="true" alt="women's shopping" />  
                        </div>
                        {/* <Image src="woman-touching-hair.jpg" width={410} height={249} alt="women's shopping"/> */}
                    </Link>  
                    <Link href="products/women/all" className={styles.shop_category_link}>

                        <h3>Women's</h3>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ShopCategory;