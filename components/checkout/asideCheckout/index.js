import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useQuerySelector from "../../../hooks/useQuerySelector";
import { selectCart, selectShippingMethod, selectShippingPrice, selectCartFullPrice, updateCartTotalPrice, updateCartTotalPriceWithShipping } from "../../../feature/cartSlice/cartSlice";
import { bufferImg } from "../../../utils/generalUtils";
import styles from "../../../styles/checkoutpage/AsideCheckout.module.css";

const AsideCheckout = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const shippingPrice = useSelector(selectShippingPrice);
    const shipMethod = useSelector(selectShippingMethod);
    const cartFullPrice = useSelector(selectCartFullPrice);

    // console.log("the cart!!!!", cart);

    /* cart.user_id we send in a user_id when they create their account! 

    As for here we need cart.cartList!!!

    */

    // console.log("the cartList!!!!", cart.cartList);


    const { media } = useMediaQuery(1000);
    const { windowWidth } = useWindowDimensions();
    const root = useQuerySelector(":root");
    // console.log("checkout cart consol", cart);
    const [hydrate, setHydrate] = useState(false);
    const [invalidCoupon, setInvalidCoupon] = useState(false);
    const [validCoupon, setValidCoupon] = useState(false);
    const [accordionClick, setAccordionClick] = useState(false);
    const asideRef = useRef(null);
    const [couponVal, setCouponVal] = useState("");
    // const [shippingMethod, setShippingMethod] = useState("");
    // const [shippingPrice, setShippingPrice] = useState(0);
    const obj = {
        key: 1,
        name: "shirt",
        quantity: 3,
        price: 35,
        src: "/assets/ladybanner-removebg.png",
        alt: "shirt new 1"
    };

    // const fakeCart = new Array(2).fill(obj).map((arr, i) => ({...arr, key: i++, quantity: Math.floor(Math.random() * 3) + 1 }));


    const fullPrice = cart.cartList.map(cart => cart.quantity * parseFloat(cart.product.price)).reduce((ac, cu) => ac + cu);

    useEffect(() => {
        dispatch(updateCartTotalPrice(fullPrice));
    }, []);

    useEffect(() => {
        if (shipMethod) {
            dispatch(updateCartTotalPriceWithShipping(cartFullPrice + shippingPrice));
        }
    }, [shipMethod]);

    // console.log(quantity)

    const handleCouponInput = (e) => {
        setCouponVal(e.target.value);
    }

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        setCouponVal("");
    }

    const slideInAside = (e) => {
        setAccordionClick(!accordionClick);

        if (accordionClick !== false) {
            root.current.style.setProperty("--checkout-aside-accordion-y", "-100%");
            setTimeout(() => {
                asideRef.current.style.cssText = "display: none !important;";
            }, 500);
        }

        if (accordionClick !== true) {
            asideRef.current.style.cssText = "display: grid !important;";

            setTimeout(() => {
                root.current.style.setProperty("--checkout-aside-accordion-y", "0");
            }, 0);
        }
    }

    const handleCoupon = () => {
        /*
            if we are doing this then make a list of properties in the DB.

            the DB should 4 important properties for this:
            1: make random string coupon containing mix of strings, numbers, and symbols
            2: precentage discount
            3: how many times the coupon can be used
            4: the end date of the coupon

            So we compare the user input to what is in the DB if it matches then tell them its a valid coupon otherwise invalid

            That way we may also at the same time do here a calculcation of the precentage discount against their total price 
            in order to give them their new price

        */

        // for now just return invalid against whatever they put in
        setInvalidCoupon(true);
        // setValidCoupon(true);

    }

    useEffect(() => {
        setHydrate(true);
    }, []);


    useEffect(() => {
        if (!media) {
            asideRef.current.style.cssText = "display: grid !important;";
        } else if (media && accordionClick === false) {
            asideRef.current.style.cssText = "display: none !important;";
        }
    }, [media]);

    return (
        <>

            {
                media ? 
                <div className={styles.aside_accordion_container} onClick={slideInAside}>
                    <div className={styles.aside_accordion_inner_container}>
                        <div>
                            <BsCart2 />
                            <h3>Show order summary</h3>
                            {
                                accordionClick === false ?
                                <IoIosArrowDown /> :
                                <IoIosArrowUp />
                            }
                        </div>
                        <p>${fullPrice + shippingPrice}</p>
                    </div>
                </div> : null
            }
            <aside ref={asideRef} className={styles.aside_checkout}>
                    <div>
                        <div className={styles.cart_list_container}>
                        {
                            hydrate ?
                            cart.cartList.map(cart => 
                                <div className={styles.cart_images_container} key={cart.key}>

                                    <div className={styles.checkout_cart_image_container}>

                                        <div className={styles.image_container_cart}>
                                            <div>
                                                <Image 
                                                    fill 
                                                    src={bufferImg(cart.product.ProductBannerImage.banner_image_data)} 
                                                    alt={cart.product.ProductBannerImage.banner_image_name} />
                                                <div className={styles.eclipse_quantity_counter}>{cart.quantity}</div>
                                            </div>

                                        </div>
                                        <div className={styles.cart_name_quantity}>
                                            <span 
                                                className={styles.tool_tip}
                                                data-tooltip-product-name={cart.product.product_name}>{
                                                    cart.product.product_name.length > 16 ? 
                                                    cart.product.product_name.substring(0, 10) + "..." : 
                                                    cart.product.product_name}
                                            </span>
                                            <span>{cart.quantity}x</span>
                                        </div>
                                    </div>

                                    <div className={styles.cart_items_prices}>

                                        <span>${(cart.quantity * parseFloat(cart.product.price)).toFixed(2)}</span>
                                    </div>
                                </div>
                            ) : null
                        }
                        </div>
                        <div className={styles.coupon_area}>
                            <form onSubmit={handleCouponSubmit}>
                                <input placeholder="Gift card or discount code" value={couponVal} onChange={handleCouponInput}/>
                                <button onClick={handleCoupon}>APPLY</button>
                            </form>
                            {
                                invalidCoupon ? 
                                <p className={[styles.coupon_varification, styles.invalid_coupon].join(" ")}>Invalid Coupon Code</p> : validCoupon ?
                                <p className={[styles.coupon_varification, styles.valid_coupon].join(" ")}>Valid Coupon</p> : null
                            }
                        </div>
                        {
                            hydrate &&
                            <div className={styles.shipment_calculations}>
                                <div>
                                    <p>Subtotal</p>
                                    <p>${(fullPrice.toFixed(2))}</p>
                                </div>

                                <div>
                                    <p>** Delivery to Highlands or and Islands may take slightly longer.</p>
                                    {
                                        shippingPrice ? <p>${shippingPrice}</p> : null
                                    }
                                </div>
                            </div>
                        }
                        <div className={styles.total_price_calculations}>
                            <p>Total (incl. VAT & Shipping)</p>
                            <p><span>USD</span>${fullPrice + shippingPrice}</p>
                        </div>
                    </div>
            </aside>
        </>
    )
}

export default AsideCheckout;