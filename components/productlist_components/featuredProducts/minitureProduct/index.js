import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../../styles/Feature.module.css";
import Canvas from "../../../canva";
import { BsCart3 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import useQuerySelector from "../../../../hooks/useQuerySelector";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import { slides } from "../../../../utils/slideInHelpers";
import { selectSlideDirection, selectHrefMonitor, hrefChanger } from "../../../../feature/productSlice/productSlice";

// TODO! WHEN WE ARE IMPLEMENTING CART PAGE
// when cart is pressed and item is in cart change BsCart3 to FaCartPlus

const MinitureProductSize = ({item}) => {
    const href = useSelector(selectHrefMonitor);
    const slideDirection = useSelector(selectSlideDirection);
    const productSectionRef = useQuerySelector("#feature-product-section");
    const parentSection = productSectionRef.current;
    const productContainerRef = useRef(null);
    const dispatch = useDispatch();

    useIntersectionObserver({
        root: parentSection,
        rootMargin: "0px",
        threshold: 0
    }, [productContainerRef], slides);

    const directionsComponentClickEvent = () => {

        if (!href) {
            dispatch(hrefChanger(window.location.href));
        }

        if (slideDirection === "right") {
            delete productContainerRef.current.dataset.left;
            productContainerRef.current.setAttribute("data-right", "true");
        } else if (slideDirection === "left") {
            delete productContainerRef.current.dataset.right;
            productContainerRef.current.setAttribute("data-left", "true");
        } else {
            delete productContainerRef.current.dataset.left;
            delete productContainerRef.current.dataset.right;
        }

        if (window.location.href !== href) {
            delete productContainerRef.current.dataset.left;
            delete productContainerRef.current.dataset.right;
            dispatch(hrefChanger(window.location.href));
        }
    }


    // console.log(_arrayBufferToBase64(item.ProductBannerImage.banner_image_data.data))

    // console.log(item.ProductBannerImage.banner_image_data)

    const base64String = btoa(String.fromCharCode(... new Uint8Array(item.ProductBannerImage.banner_image_data.data))).toString("utf-8");
    // const b64encoded = btoa(String.fromCharCode.apply("image/webp", item.ProductBannerImage.banner_image_data.data));
    // console.log("base64String", "data:mime;base64," + base64String);

    const buff = Buffer.from(item.ProductBannerImage.banner_image_data, "base64"); //.toString("utf-8");

    const bannerImg = buff.toString("utf-8");
    
    const firstParam = item.type.replace(/\w\s\w+$/, "").toLowerCase();
    const secondParam = item.type.replace(/^\w+\s/, "").toLowerCase();

    // console.log("firstParam", firstParam);

    // console.log("secondParam", secondParam);

    // console.log("the ID", item.id);


    useEffect(() => {
        directionsComponentClickEvent();
    }, [slideDirection, process?.title === "browser" && window.location.href]);


    return (
        <>
                <div ref={productContainerRef} className={styles.imgOuterContainer} >
                    <div className={styles.imgInnerContainer}>
                        {/* <Canvas src={`data:image.png;base64,${base64String}`} className={styles.imgItem} /> */}
                        {/* <Canvas src={`data:mime;base64,` + base64String} className={styles.imgItem} /> */}
                    {/* <Link href={`/products/${firstParam}/${secondParam}/${item.id}`}> */}

                        <Canvas src={bannerImg} className={styles.imgItem} />
                        {/* </Link> */}

                    </div>
                    <p>
                        <Link href={`/products/${firstParam}/${secondParam}/${item.id}`}>

                            {item.product_name}
                        </Link>
                    
                    </p>
                    <BsCart3 className={styles.cart_feature} />
                    <p>${item.price}</p>
                </div>
        </>
    );
}

export default MinitureProductSize;