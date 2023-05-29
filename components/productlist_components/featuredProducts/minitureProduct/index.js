import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import styles from "../../../../styles/Feature.module.css";
import Canvas from "../../../canva";
import useQuerySelector from "../../../../hooks/useQuerySelector";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import { slides } from "../../../../utils/slideInHelpers";
import { selectSlideDirection, selectHrefMonitor, hrefChanger } from "../../../../feature/productSlice/productSlice";
import { addProductToCartThunk, newCartThunk, selectCart } from "../../../../feature/cartSlice/cartSlice";
import { bufferImg } from "../../../../utils/generalUtils";

const MinitureProductSize = ({item}) => {
    const [fireOnce, setFireOnce] = useState(false);
    const cart = useSelector(selectCart);
    const href = useSelector(selectHrefMonitor);
    const slideDirection = useSelector(selectSlideDirection);
    const productSectionRef = useQuerySelector("#feature-product-section");
    const parentSection = productSectionRef.current;
    const cartIconRef = useRef(null);
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

    const bannerImg = bufferImg(item.ProductBannerImage.banner_image_data); //.toString("utf-8");
    
    const firstParam = item.type.replace(/\w\s\w+$/, "").toLowerCase();
    const secondParam = item.type.replace(/^\w+\s/, "").toLowerCase();

    const handleCart = () => {
        if (!cart.id) {
            dispatch(newCartThunk({ id: "", abandonded: "true"}));
            setFireOnce(true);
        } else {
            const body = {
                quantity: 1,
                product_id: item.id
            }
            setTimeout(() => {
                dispatch(addProductToCartThunk({cartId: cart.id, body: body, product: item}));
            }, 900);
        }
    }

    const handleRejectClick = () => {
        return;
    }

    const handleGrow = () => {
        cartIconRef.current.classList.add("grow-shrink");
        setTimeout(() => {
            cartIconRef.current.classList.remove("grow-shrink");
        }, 750);
    }

    const fetchCartListItem = () => {
        setTimeout(() => {
            if (cart.id) {
                const body = {
                    quantity: 1,
                    product_id: item.id
                }
                dispatch(addProductToCartThunk({cartId: cart.id, body: body, product: item}));
            }
        }, [900]);
    }

    useEffect(() => {
        directionsComponentClickEvent();
    }, [slideDirection, process?.title === "browser" && window.location.href]);

    useEffect(() => {
        if (fireOnce === true) {
            if (cart.id) {
                fetchCartListItem();
            }
            setFireOnce(false);
        }
    }, [cart.id]);

    return (
        <>
                <div 
                    id={item.idHTML}
                    name={item.idHTML}
                    data-card-products-outer-all
                    ref={productContainerRef}
                    className={[styles.imgOuterContainer, "card_products"].join(" ")}
                >
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
                    {
                        !cart.cartList.some(val => val.product.id === item.id) ?
                        <div
                            onMouseEnter={handleGrow}
                            className={styles.cart_feature}>
                            <span ref={cartIconRef}>
                                <BsCart3 onClickCapture={handleCart} />
                            </span>
                        </div>:
                        <div
                            // onMouseEnter={handleGrow}
                            className={[styles.cart_feature, styles.cart_in_cart].join(" ")}>
                            <span>
                                <FaCartPlus onClickCapture={handleRejectClick} />
                            </span>
                        </div>
                    }
                    <p>${item.price}</p>
                </div>
        </>
    );
}

export default MinitureProductSize;