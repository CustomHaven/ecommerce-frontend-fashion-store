import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "../../../styles/homepage/Guarantee.module.css";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { slides } from "../../../utils/slideInHelpers";

const Guarantee = () => {

    const containerRef = useRef(null);
    const refLeft1 = useRef(null);
    const refLeft2 = useRef(null);
    const refRight1 = useRef(null);
    const refRight2 = useRef(null);

    const containerCurrent = containerRef.current;

    const targetRefArray = [ refLeft1, refLeft2, refRight1, refRight2 ];


    const [bigScreen, setBigScreen] = useState(true);
    const { windowWidth } = useWindowDimensions();

    useIntersectionObserver({
        root: containerCurrent,
        rootMargin: "0px",
        threshold: 0
    }, targetRefArray, slides)


    useEffect(() => {
        if (windowWidth >= 627) {
            setBigScreen(true);
        } else {
            setBigScreen(false);
        }
    }, [bigScreen]);

    return (
        <>
            <article ref={containerRef} className={styles.article_guarantee}>
                <div data-left={bigScreen === false ? "left" : null} data-delay={bigScreen === false ? "0.6s" : ""} ref={refLeft1}>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Beep-Beep-Fast-Delivery.png" fill contain="true" alt="fast-delivery" />
                    </figure>
                    <h3>Free Shipping</h3>
                </div>
                <div data-right={bigScreen === false ? "right" : null} data-delay={bigScreen === false ? "0.9s" : ""} ref={refRight1}>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/The-Little-Things-Business-Planning.png" fill contain="true" alt="buy-simple" />
                    </figure>
                    <h3>Online Order</h3>
                </div>
                <div data-left={bigScreen === false ? "left" : null} data-delay={bigScreen === false ? "0.6s" : ""} ref={refLeft2}>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Wavy-Buddies-Dollar.png" fill contain="true" alt="save-your-money" />
                    </figure>
                    <h3>Save Money</h3>
                </div>
                <div data-right={bigScreen === false ? "right" : null} data-delay={bigScreen === false ? "0.9s" : ""} ref={refRight2}>
                    <figure className={styles.fig_guarantee}>
                        <Image src="/assets/Lifesavers-Videocall.png" fill contain="true" alt="24/7 support" />
                    </figure>
                    <h3>24/7 Support</h3>
                </div>
            </article>
        </>
    )
}

export default Guarantee;