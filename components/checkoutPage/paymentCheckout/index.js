import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFirstName,
    selectLastName,
    selectAddressLine1,
    selectAddressLine2,
    selectTownCity,
    selectPostcode,
    selectCountry,
    selectCountryCode,
    selectFullPhoneNumber,
    saveContactDetailThunk,
    selectContactDetail } from "../../../feature/contactDetailSlice/contactDetailSlice";
import { selectLoginProfile, refreshAuth, loginPerson } from "../../../feature/authSlice/authSlice";
import { selectCart,
    selectCartFullPriceWithShipping,
    selectCartFullPrice,
    selectShippingMethod,
    selectShippingPrice,
    abandonedCartThunk } from "../../../feature/cartSlice/cartSlice";
import { selectOrder, newOrderThunk } from "../../../feature/orderSlice/orderSlice";
import { makePaymentThunk, selectPaymentConfirmed } from "../../../feature/paymentSlice/paymentSlice";
import { HiLockClosed } from "react-icons/hi"; // 16 x 16
import { RiQuestionFill } from "react-icons/ri"; // 16 x 16
import useQuerySelector from "../../../hooks/useQuerySelector";
import { insertHyphen, validateCreditCardNumber, creditCardType, noInputScenario } from "../../../utils/contactFormValidation";
import { fetchMethod, headers } from "../../../utils/generalUtils";
import { toggleCelebrateNewOrder } from "../../../feature/generalComponents/generalComponentSlice";
import styles from "../../../styles/checkoutpage/PaymentCheckout.module.css";
import { updateProductThunk, selectUpdateProducts } from "../../../feature/productSlice/productSlice";

const PaymentCheckout = (props) => {
    const { contentRef, openAccordion, setOpenAccordion, setOpenAccordionShipping, shippingAccordionRef } = props;
    const router = useRouter();
    const root = useQuerySelector(":root");
    const [longCardNum, setLongCardNum] = useState("");
    const [cardTypeSrc, setCardTypeSrc] = useState("");
    const [cardTypeAlt, setCardTypeAlt] = useState("");
    const [fetchLoading, setFetchLoading] = useState(false);
    const [logingSuccess, setLoginSuccess] = useState(false);
    const cardTypeRef = useRef(null);

    const [nameOnCard, setNameOnCard] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
    const [longNumber, setLongNumber] = useState(0);

    const dispatch = useDispatch();
    
    const updatedProductsArray = useSelector(selectUpdateProducts);
    const loginProfile = useSelector(selectLoginProfile);
    const fName = useSelector(selectFirstName);
    const lName = useSelector(selectLastName);
    const address = useSelector(selectAddressLine1);
    const apartment = useSelector(selectAddressLine2);
    const town = useSelector(selectTownCity);
    const postcode = useSelector(selectPostcode);
    const country = useSelector(selectCountry);
    // const countryCode = useSelector(selectCountryCode);
    const phoneNumber = useSelector(selectFullPhoneNumber);
    const contactDetail = useSelector(selectContactDetail);

    const finalPrice = useSelector(selectCartFullPriceWithShipping);
    const shippingPrice = useSelector(selectShippingPrice);
    const shippingMethod = useSelector(selectShippingMethod);
    const cartPrice = useSelector(selectCartFullPrice);
    const cart = useSelector(selectCart);
    const paymentConfirmed = useSelector(selectPaymentConfirmed);
    const orderCompleted = useSelector(selectOrder);

    const luhnAlgorithm = (e) => {
        let cardNumber = e.target.value;
        e.target.value = cardNumber.replace(/[^-\d]/g, '');
        cardNumber = cardNumber.replace(/\-/g, '');

        const valueWithHyphens = insertHyphen(e.target.value, 4, true);
        setLongCardNum(valueWithHyphens);
        console.log("cardNumber.lenght", cardNumber.length);
        console.log("cardNumber", cardNumber);
        setLongNumber(cardNumber);
        if (validateCreditCardNumber(cardNumber)) {
            if (cardNumber.length > 0) {
                cardTypeRef.current.removeAttribute("hidden");
                // const p = document.querySelector("p[data-paragraph='card'");
                // if (p) {
                //     p.remove();
                // }
                
                setCardTypeSrc("/assets/creditCardImg/" + (creditCardType(cardNumber) || "other") + ".png");
                setCardTypeAlt(creditCardType(cardNumber) || "other");
                console.log("longCardNum", longCardNum);
                console.log("cardNumber", cardNumber);
                console.log("cardTypeALT", cardTypeAlt);
                console.log("cardTypeALT TYPE", typeof cardTypeAlt);
                return true;
            } else {
                cardTypeRef.current.setAttribute('hidden', "true");
                console.log("longCardNum", longCardNum);
                console.log("cardNumber", cardNumber);
                return false;
            }
        } else {
            cardTypeRef.current.setAttribute('hidden', "true");
            console.log("longCardNum", longCardNum);
            console.log("cardNumber", cardNumber);
            return false;
        }
    }

    const handleCardName = (e) => {
        const reg = new RegExp(/^[a-z|\s-\–]*$/gi)
        if (!reg.test(e.target.value)) {
            return;
        }
        setNameOnCard(e.target.value.toUpperCase().replace(/-/g, "–").trimLeft());
    }

    const handleExpiryDate = (e) => {
        const reg = new RegExp(/^\d{0,4}-?\d{0,2}$/)
        if (!reg.test(e.target.value)) {
            return;
        }
        setExpiryDate(e.target.value.replace("-", ""));
    }

    const handleCVV = (e) => {
        const regex = new RegExp(/^\d{0,4}$/);
        if (!regex.test(e.target.value)) {
            return;
        }
        setCVV(e.target.value);
    }


    const handleSubmit = (e) => {
        console.log("SUBMIT PRESSED!");
        e.preventDefault();
    }

    const handleReturn = (e) => {
        console.log("handleReturn clicked!");
        // contentRef.current.style.display = "none";
        setOpenAccordion(false);
        root.current.style.setProperty("--shipping-content-transform-y", "-100%");
        
        setTimeout(() => {
            shippingAccordionRef.current.classList.add("show_content_accordion");
            setOpenAccordionShipping(true);
        }, 100);
    }

    const handlePay = (e) => {
        console.log("HANDLE PAY clicked!");
        console.log("loginProfile what is it?", loginProfile);

        if (!cvv.length >= 3 && !cvv.length <= 4 && expiryDate.length >= 6 && expiryDate.length <= 7) {
            return;
        }

        if (loginProfile.hasOwnProperty("message")) {
            console.log("wont be called?! the refresh bit")

            dispatch(refreshAuth({ refresh_token: loginProfile.refresh_token }));

            setFetchLoading(true);
            fetchMethod("/api/refresh", "POST", headers, {
                refresh_token: localStorage.getItem("refresh_token")
            }, true)
                .then(res => { console.log("final res what is it?", res); return res })
                .then(res => { 
                    dispatch(loginPerson(res)); 
                    setFetchLoading(false); 
                    setLoginSuccess(true);
            });

            // dispatch(saveContactDetailThunk({ userId: loginProfile.user.id, bodyObj: {
            //     firstName: fName,
            //     lastName: lName,
            //     addressLine1: address,
            //     addressLine2: apartment,
            //     townCity: town,
            //     postcode: postcode,
            //     country: country,
            //     phoneNumber: phoneNumber,
            // }}));
        } else {
            console.log("no have?!");
        }
    }

    useEffect(() => {
        if (logingSuccess) {
            if (loginProfile.user?.token !== undefined) {
                dispatch(saveContactDetailThunk({ 
                    userId: loginProfile.user.id, 
                    bodyObj: {
                        firstName: fName,
                        lastName: lName,
                        addressLine1: address,
                        addressLine2: apartment,
                        townCity: town,
                        postcode: postcode,
                        country: country,
                        phoneNumber: phoneNumber,
                    },
                    refreshed_token: loginProfile.token,
                    loginStage: "refresh"
                }));
            }
        }
    }, [logingSuccess]);

    useEffect(() => {
        if (contactDetail.id) {
            console.log("loginProfile.user.id", loginProfile.user.id);
            dispatch(makePaymentThunk({
                userId: loginProfile.user.id,
                nameOnCard: nameOnCard,
                cardType: cardTypeAlt,
                cardNumber: Number(longNumber),
                expiryDate: expiryDate,
                cvv: cvv,
                amount: finalPrice,
                paymentType: "card", // for now, but as this section is a card payment we might leave it. it is passed into the query and it is card_type 
                currency: "GBP", // for now, modify later to check for the users default currency
                refreshed_token: loginProfile.token,
                loginStage: "refresh"
            }));
        }
    }, [contactDetail.id]);

    useEffect(() => {
        if (paymentConfirmed) {
            dispatch(newOrderThunk({
                user_id: loginProfile.user.id,
                cart_id: cart.id,
                body: {
                    shipping_price: shippingPrice,
                    shipping_method: shippingMethod,
                    final_price: finalPrice,
                    cart_price: cartPrice,
                    payment_provider_id: paymentConfirmed
                },
                refreshed_token: loginProfile.token,
                loginStage: "refresh"
            }));
        }
    }, [paymentConfirmed]);

    const subtractProductQuantity = async (orders) => {
        await Promise.all(orders.OrderLists.map(async order => {
            return await dispatch(updateProductThunk({
                id: order.product_id, 
                body: {
                    quantity: order.quantity,
                    add: false
                }
            }));
        }));
    }

    useEffect(() => {
        if (orderCompleted.id) {
            // send an email to them where I am congratulating them for their order!


            subtractProductQuantity(orderCompleted);

            // Promise.all(orderCompleted.OrderLists.map(async order => {
            //     await dispatch(updateProductThunk(order.id, {
            //         quantity: order.quantity
            //     }))
            // }));
            // on the homepage make modal showing their order number and flex-row in direction of card containing the banner images/price quantity of the units in their order
            // and as a master class stage do firework animation around the modal
        }
    }, [orderCompleted]);

    useEffect(() => {
        if (updatedProductsArray.length > 0) {
            console.log("updatedProductsArray", updatedProductsArray);
            console.log("cart.id", cart.id);
            dispatch(abandonedCartThunk({
                id: cart.id, 
                abandoned: false 
            }));
        }
    }, [updatedProductsArray]);

    useEffect(() => {
        if (cart.abandoned === false) {
            // console.log("all work is done");
            // console.log("orderCompleted", orderCompleted);
            dispatch(toggleCelebrateNewOrder(true));
            router.push("/?order=" + orderCompleted.id);
        }
    }, [cart.abandoned]);

    return (
        <article id="payment_method" className={styles.payment_method}>
            {
                openAccordion === true &&
            
            <div ref={contentRef}>
                <div className={styles.payment_form_container}>
                    <div>
                        <label className={styles.radio_checkbox}>
                            <input type="radio" name="credit_card" checked />
                            <span className={styles.radio_checkmark}></span>
                            Credit card
                        </label>
                        <div className={styles.card_type_flexed}>
                            <Image priority src="/assets/visa.svg" width={38} height={24} alt="Example of Visa card" />
                            <Image priority src="/assets/maestro.svg" width={38} height={24} alt="Example of Maestro card" />
                            <Image priority src="/assets/mastercard.svg" width={38} height={24} alt="Example of MasterCard card" />
                            <Image priority src="/assets/american_express.svg" width={38} height={24} alt="Example of American Express card" />
                            <span>and more...</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.payment_form_content}>
                        <figure 
                            data-tooltip="All transactions are secure and encrypted."
                            className={[styles.svg_icons, styles.lock, styles.tool_tip].join(" ")}>
                            <HiLockClosed />
                        </figure>
                        <section className={styles.payment_form_content_first_part}>
                            <label htmlFor="card_number">Card Number</label> { /* lock */}
                            <div>
                                <input onChange={luhnAlgorithm} type="text" name="card_number" placeholder="Card number" value={longCardNum} maxLength="24" />
                                <div hidden="true" className={styles.creditCardType} ref={cardTypeRef}>
                                    <Image src={cardTypeSrc} width="51" height="32" alt={cardTypeAlt} />
                                </div>
                            </div>
                        </section>
                        <section className={styles.payment_form_content_first_part}>
                            <label className={styles.push_label_down} htmlFor="name_on_card">Name on Card</label>
                            <input onChange={handleCardName} type="text" name="name_on_card" placeholder="Name on card" value={nameOnCard} />
                        </section>

                        <section className={styles.payment_form_content_second_part}>
                            <label className={styles.left_labels} htmlFor="expiry_date">Expiry Date</label>
                            <input 
                                className={styles.left_inputs} 
                                type="text" 
                                name="expiry_date" 
                                placeholder="Expiration date (YYYY-MM)" 
                                // maxLength="7"
                                onChange={handleExpiryDate}
                                value={
                                    expiryDate.length > 4 ? `${expiryDate.slice(0, 4)}-${expiryDate.slice(4)}` : expiryDate
                                }
                            />
                            <label className={styles.right_labels} htmlFor="cc">Security Code</label>
                            <input 
                                className={styles.right_inputs}
                                type="text"
                                name="cc"
                                placeholder="Security code (CC)"
                                onChange={handleCVV}
                                value={cvv}
                            />
                            <figure 
                                data-tooltip="3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front" 
                                className={[styles.svg_icons, styles.question_mark, styles.tool_tip].join(" ")}>
                                <RiQuestionFill />
                            </figure>
                        </section>
                    </form>
                </div>

                <div className={styles.submit_payment_method}>
                    <p onClick={handleReturn}><span>&#60;</span>&nbsp;&nbsp;Return to delivery method</p>
                    <input onClick={handlePay} type="submit" value={"PAY NOW"} />
                </div>
                <p>By placing this order, you agree to our <Link href="/terms-and-conditions">Terms & Conditions</Link> and understand our <Link href="privacy-policy">Privacy Policy.</Link></p>
            </div>
            }
        </article>
    )
}

export default PaymentCheckout;