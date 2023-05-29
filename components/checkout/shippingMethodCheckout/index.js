import Link from 'next/link';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShippingMethod,
    updateShippingPrice,
    updateCartDeliveryInformation,
    selectShippingMethod,
    selectShippingPrice } from '../../../feature/cartSlice/cartSlice';
import styles from "../../../styles/checkoutpage/ShippingMethodCheckout.module.css";

const ShippingMethodCheckout = (props) => {

    const { openAccordion, setOpenAccordion, setCloseAccordionContact, contentRef, contactAccordionRef, setOpenAccordionPayment } = props;

    const expressRef = useRef(null);
    const standardRef = useRef(null);
    const expressLabel = useRef(null);
    const standardLabel = useRef(null);

    const shippingMethod = useSelector(selectShippingMethod);
    const shippingPrice = useSelector(selectShippingPrice);

    const dispatch = useDispatch();

    const handleExpressClick = (e) => {
        expressRef.current.checked = true;
        standardRef.current.checked = false;
        dispatch(updateShippingMethod(expressLabel.current.innerText));
        dispatch(updateShippingPrice(9.99));
    }

    const handleStandardClick = (e) => {
        standardRef.current.checked = true;
        expressRef.current.checked = false;
        dispatch(updateShippingMethod(standardLabel.current.innerText));
        dispatch(updateShippingPrice(5.99));
    }

    const handleReturn = (e) => {
        console.log("handleReturn clicked!");
        setCloseAccordionContact(false);
        // console.log("DO WE HAVE THIS?! contactAccordionRef", contactAccordionRef);
        contactAccordionRef.current.classList.add("show_content_accordion");
        setOpenAccordion(false);
        contentRef.current.classList.remove("show_content_accordion");
    }

    const handleNextPart = (e) => {
        if (expressRef.current.checked === true || standardRef.current.checked === true) {
            // console.log("handleNextPart clicked!");
            contentRef.current.classList.remove("show_content_accordion");
            dispatch(updateCartDeliveryInformation({ span: "Method", p: shippingMethod + " · $" + shippingPrice, button: "Change" }));
            setOpenAccordion(false);
            setOpenAccordionPayment(true);
        }
    }

    return (
        <article id="shipping_method" className={styles.shipping_method}>
            <div style={{ height: openAccordion ? "100%" : "0" }} ref={contentRef} >
                <h4>Delivery Method</h4>
                <p><Link href="/shipping-policy">Shipping Policy</Link></p>
                <div className={styles.shipping_method_checkboxes}>
                    <div>
                        <input ref={expressRef} onClick={handleExpressClick} id="Express-Method" name="Express-Method" type="checkbox" value="Express"/>
                        <label ref={expressLabel} for="Express-Method">Express Shipping (Delivered in 1-2 Business Days with DPD)</label>
                        <p>$9.99</p>
                    </div>
                    <div>
                        <input ref={standardRef} onClick={handleStandardClick} id="Standard-Method" type="checkbox" value="Standard" />
                        <label ref={standardLabel} for="Standard-Method">Standard Shipping (Delivered in 2-3 Business Days with Evri/Hermes)</label>
                        <p>$5.99</p>
                    </div>
                </div>
                <div className={styles.submit_shipping_method}>
                    <p onClick={handleReturn}><span>&#60;</span>&nbsp;&nbsp;Return to information</p>
                    <input onClick={handleNextPart} type="submit" value={"Continue To Payment"} />
                </div>
            </div>
        </article>
    )
}

export default ShippingMethodCheckout;