import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../feature/cartSlice/cartSlice";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";
import Canvas from "../canva";
import Breadcrumbs from "../Breadcrumbs";
import ExpressCheckout from "./expressCheckout";
import AsideCheckout from "./asideCheckout";
import ContactDetailCheckout from "./contactDetailsCheckout";
import ShippingMethodCheckout from "./shippingMethodCheckout";
import PaymentCheckout from "./paymentCheckout";
import Loading from "../Loading";
import { selectCheckOutContactDetailRef } from "../../feature/generalComponents/generalComponentSlice";
import { selectEmail } from "../../feature/userSlice/userSlice";
import { selectDeliverTo } from "../../feature/contactDetailSlice/contactDetailSlice";
import { selectShippingMethod, selectShippingPrice, updateCartDeliveryInformation, selectCartDeliveryInformation } from "../../feature/cartSlice/cartSlice";
import styles from "../../styles/checkoutpage/Checkout.module.css";

const CheckoutPage = () => {
    const cart = useSelector(selectCart);
    const { windowWidth } = useWindowDimensions();
    const [hydrate, setHydrate] = useState(false);
    const [closeAccordionContact, setCloseAccordionContact] = useState(false);
    const [openAccordionShipping, setOpenAccordionShipping] = useState(false);
    const [openAccordionPayment, setOpenAccordionPayment] = useState(false);
    const [fakeLoading, setFakeLoading] = useState(false);

    const contactAccordionRef = useRef(null);
    const shippingAccordionRef = useRef(null);
    const paymentAccordionRef = useRef(null);

    const deliverTo = useSelector(selectDeliverTo);
    const email = useSelector(selectEmail);
    const shippingMethod = useSelector(selectShippingMethod);
    const shippingPrice = useSelector(selectShippingPrice);
    const cartDelivery = useSelector(selectCartDeliveryInformation);

    const root = useQuerySelector(":root");
    const contactDetailRef = useQuerySelector("#contact_detail_content");
    

    const contactRef = useRef(contactDetailRef.current);;
    const mainSectionRef = useRef(null);

    // const contactDetailRef = useSelector(selectCheckOutContactDetailRef);
    const dispatch = useDispatch();


    const handleOpenClick = (content) => {
        console.log("IS CONTENT HERE?!", content);
        // callback();
        console.log("these clicked!!")
        if (content.span !== "Method") {
            root.current.style.setProperty("--shipping-content-transform-y", "100%");
            setCloseAccordionContact(false);
            contactAccordionRef.current.classList.add("show_content_accordion");
            setOpenAccordionPayment(false);
        }
        if (content.span === "Method") {
            root.current.style.setProperty("--shipping-content-transform-y", "100%");
            shippingAccordionRef.current.classList.add("show_content_accordion");
            setOpenAccordionShipping(true);
            setOpenAccordionPayment(false);
        }
    }

    useEffect(() => {
        setHydrate(true);
    }, []);

    return (
        <>
        {

            hydrate &&
            <>
            <section ref={mainSectionRef} data-white className={styles.checkout_main_container}>
                <Loading sectionWidth={mainSectionRef} loading={fakeLoading} />
                <section className={styles.checkout_main_section}>
                    <div className={styles.checkout_inner_main_container}>
                        <div>
                            {/* <Canvas src="/assets/custom-haven-monkey-small.png" className={styles.checkout_logo} /> */}
                            <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={styles.checkout_logo} />
                        </div>
                        <Breadcrumbs divideBy={8} breadcrumbs={["Home", "All Products", "Cart"]} pageType={"checkoutPage"} />
                        <ExpressCheckout 
                            closeAccordion={closeAccordionContact} 
                        />

                        <div style={{ display: closeAccordionContact ? "block" : "none" }} className={[styles.hidden_content].join(" ")}>
                            {
                                cartDelivery.length >= 1 ?
                                    cartDelivery.map((content, index) => 
                                        <div key={"content " + index}>
                                            <span>{content.span}</span>
                                            <p>{content.p}</p>
                                            <button onClick={() => handleOpenClick(content)}>{content.button}</button>
                                        </div>
                                    ) : null
                            }
                        </div>

                        {
                            closeAccordionContact == false ?
                            <>
                            <p className={styles.informative_division}>OR CONTINUE BELOW TO PAY WITH A CREDIT CARD</p>
                            <div className={styles.card_type_flexed}>
                                <Image priority src="/assets/visa.svg" width={38} height={24} alt="Example of Visa card" />
                                <Image priority src="/assets/mastercard.svg" width={38} height={24} alt="Example of MasterCard card" />
                                <Image priority src="/assets/american_express.svg" width={38} height={24} alt="Example of American Express card" />
                            </div>
                            </> 
                            : null
                        }
                        <ContactDetailCheckout
                            contentRef={contactAccordionRef}
                            closeAccordion={closeAccordionContact}
                            setCloseAccordion={setCloseAccordionContact}
                            openAccordionShipping={openAccordionShipping}
                            setOpenAccordionShipping={setOpenAccordionShipping}
                            shippingAccordionRef={shippingAccordionRef}
                            setOpenAccordionPayment={setOpenAccordionPayment}
                        />
                        <ShippingMethodCheckout
                            contentRef={shippingAccordionRef}
                            contactAccordionRef={contactAccordionRef}
                            openAccordion={openAccordionShipping}
                            setOpenAccordion={setOpenAccordionShipping}
                            setCloseAccordionContact={setCloseAccordionContact}
                            setOpenAccordionPayment={setOpenAccordionPayment}
                        />

                        <PaymentCheckout 
                            contentRef={paymentAccordionRef}
                            openAccordion={openAccordionPayment}
                            setOpenAccordion={setOpenAccordionPayment}
                            setOpenAccordionShipping={setOpenAccordionShipping}
                            shippingAccordionRef={shippingAccordionRef}
                        />

                        <footer className={styles.checkout_footer}>
                            <div>
                                <Link href="refund-policy"><p>Refund Policy</p></Link>
                                <Link href="privacy-policy"><p>Privacy Policy</p></Link>
                                <Link href="terms-and-conditions"><p>Terms & Conditions</p></Link>
                                <Link href="delivery-informations"><p>Delivery Informations</p></Link>
                            </div>
                        </footer>

                    </div>
                </section>

                <AsideCheckout cart={cart} />

        </section>  
        </>
        }
        </>
    )
};

export default CheckoutPage;