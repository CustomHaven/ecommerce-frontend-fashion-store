import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpressCheckout from "../expressCheckout";
import ContactInformation from "../../ContactInformation";
import useQuerySelector from "../../../hooks/useQuerySelector";
import { selectFirstName,
    selectLastName,
    selectAddressLine1,
    selectAddressLine2,
    selectTownCity,
    selectPostcode,
    selectCountry,
    selectCountryCode,
    selectPhoneNumber,
    saveDeliverTo,
    saveCountryCode,
    saveContactDetailThunk, saveFullPhoneNumber } from "../../../feature/contactDetailSlice/contactDetailSlice";
import { saveEmailAddress, selectUserFindEmailError, selectUserProfile, findUserByEmailThunk, saveNewGuestThunk } from "../../../feature/userSlice/userSlice";
import { selectCartDeliveryInformation, updateCartDeliveryInformation, addUserThunk, selectCart } from "../../../feature/cartSlice/cartSlice";
import { selectLoginProfile, loginUserAuth } from "../../../feature/authSlice/authSlice";
import { selectCheckOutContactDetailRef, saveCheckOutContactDetailDiv } from "../../../feature/generalComponents/generalComponentSlice";
import { validatePhoneNumber, emailValidator } from "../../../utils/contactFormValidation";
import styles from "../../../styles/checkoutpage/ContactDetailCheckout.module.css";
import axios from "axios";

const ContactDetailCheckout = (props) => {

    const { closeAccordion, setCloseAccordion, openAcccordionShipping, setOpenAccordionShipping, contentRef, shippingAccordionRef  } = props;

    const storedJwt = localStorage.getItem("access_token");
    const [jwt, setJwt] = useState(storedJwt || null);

    const root = useQuerySelector(":root");
    const countryCodeRefSpan = useRef(null);
    const countryCodeRefSelect = useRef(null);

    const cart = useSelector(selectCart);

    const fName = useSelector(selectFirstName);
    const lName = useSelector(selectLastName);
    const address = useSelector(selectAddressLine1);
    const apartment = useSelector(selectAddressLine2);
    const town = useSelector(selectTownCity);
    const postcode = useSelector(selectPostcode);
    const country = useSelector(selectCountry);
    // const countryCode = useSelector(selectCountryCode);
    const phoneNumber = useSelector(selectPhoneNumber);
    // const fullPhoneNumber = 

    const emailNotFound = useSelector(selectUserFindEmailError);
    const userProfile = useSelector(selectUserProfile);
    const loginProfile = useSelector(selectLoginProfile);

    console.log(" top level emailNotFound", emailNotFound);

    const dispatch = useDispatch();

    const [emailInput, setEmailInput] = useState("");

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
        dispatch(saveEmailAddress(e.target.value));
        // dispatch(updateCartDeliveryInformation({span: "Contact", p: "" }))
    }

    const handleEmailSubmit = (e) => {
        console.log("handle Submit");
        e.preventDefault();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailValidator(emailInput)) {
            console.log("invalid email address!");
            return;
        }

        let countryCode;

        if (countryCodeRefSelect.current) {
            countryCode = "+" + countryCodeRefSelect.current.value;
        } else if (countryCodeRefSpan.current) {
            countryCode = "+" + countryCodeRefSpan.current.innerText;
        }

        dispatch(saveCountryCode("+" + countryCode));
        // console.log("countryCOde we have value?", typeof countryCode);
        // console.log("countryCOde we have value?", countryCode);
        const arrayForm = [ fName, lName, address, town, postcode, country, countryCode ];
        // console.log("arrayFORM VALUES?!", arrayForm);
        if (arrayForm.some(value => value.length <= 1)) {
            console.log("some of the values are empty!");
            return;
        }
        const validPhoneNumber = validatePhoneNumber(phoneNumber, countryCode);
        if (validPhoneNumber === "failed") {
            console.log("invalid phone number!");
            return;
        }
        console.log("clicked the input submit")

        console.log("what is it emailInput?? ", emailInput);

        dispatch(findUserByEmailThunk({ email: emailInput}));

        // setEmailInput("");
        dispatch(saveDeliverTo(address + ", " + apartment + ", " + town + ", " + postcode + ", " + country));
        contentRef.current.classList.remove("show_content_accordion");
        dispatch(updateCartDeliveryInformation({ span: "Contact", p: emailInput, button: "Change" }));
        dispatch(updateCartDeliveryInformation({ span: "Deliver to",
                                                p: address + ", " + apartment + ", " + town + ", " + postcode + ", " + country, 
                                                button: "Change" }));
        
        setCloseAccordion(true);

        root.current.style.setProperty("--shipping-content-transform-y", "100%");

        setTimeout(() => {
            shippingAccordionRef.current.classList.add("show_content_accordion");
            setOpenAccordionShipping(true);
        }, 900);
    }

    useEffect(() => {
        if (emailNotFound) {
            console.log("is this called!?? hopefully email we dont have!!?");
            dispatch(saveNewGuestThunk({ email: emailInput }));
        }
    }, [emailNotFound]);

    useEffect(() => {
        if (userProfile.id !== undefined) {
            console.log("we have user Profile?", userProfile);

            dispatch(loginUserAuth({ email: emailInput, password: "guest" }));
        } 
    }, [userProfile]);


    useEffect(() => {
        if (loginProfile.token !== undefined) {
            console.log("contryCodeREF VALS", "+" + countryCodeRefSpan.current.innerText);
            dispatch(saveFullPhoneNumber("+" + countryCodeRefSpan.current.innerText + " " + phoneNumber.replace(/[-]/g, " ")));
            dispatch(addUserThunk({ cartId: cart.id, userId: loginProfile.user.id })); // the cart add user_id here
            // dispatch(saveContactDetailThunk({ userId: loginProfile.user.id, bodyObj: {
            //     firstName: fName,
            //     lastName: lName,
            //     addressLine1: address,
            //     addressLine2: apartment,
            //     townCity: town,
            //     postcode: postcode,
            //     country: country,
            //     phoneNumber: "+" + countryCodeRefSpan.current.innerText + " " + phoneNumber.replace(/[-]/g, " "),
            // }}));
            // console.log("before axios function");
            // axiosFetching();
            // console.log("after axios function");
            // localStorage.setItem("access_token", loginProfile.token);
            // setJwt(loginProfile.token);
            // document.cookie = "access_token=" + loginProfile.token;
        }
    }, [loginProfile]);


    return (
        <>

            <article style={{ padding: !closeAccordion ? "50px 0" : "0px" }} id="contact_details" className={styles.contact_details}>
                {
                    // !closeAccordion ?
                    <div id="contact_detail_content" style={{ height: !closeAccordion ? "100%" : "0" }} ref={contentRef} className={"show_content_accordion"}>
                        <div className={styles.contact_header_infos}>
                            <h3>Contact Information</h3>
                            <p>Already have an account? <span><Link href="/login">Log in</Link></span></p>
                        </div>

                        <form className={styles.checkout_email_form} onSubmit={handleEmailSubmit}>
                            <input onChange={handleEmailChange} name="email" type="text" placeholder="Email" value={emailInput} />

                            <div>
                                <input id="keep_uptodate" type="checkbox" name="email_campaign" />
                                <label htmlFor="keep_uptodate">Keep me up to date on news and exclusive offers from Custom Haven.</label>
                            </div>

                            <p>Note: You can opt-out at any time. See our <span><Link href="/privacy-policy">Privacy Policy.</Link></span></p>
                        </form>

                        <ContactInformation 
                            header={"Delivery Address"}
                            countryCodeRefSpan={countryCodeRefSpan}
                            countryCodeRefSelect={countryCodeRefSelect}
                        />

                        <div className={styles.submit_contact_details}>
                            <input onClick={handleSubmit} type="submit" value={"Continue To Delivery Method"} />
                        </div>
                    </div> //: null
                }
            </article>
            {/* <div style={{ display: closeAccordion ? "block" : "none" }} className={[styles.hidden_content, "slide-up"].join(" ")}>
                    <div>
                        <span>Contact</span>
                        <p>{emailSubmitted}</p>
                        <button onClick={handleOpenClick}>Change</button>
                    </div>

                    <div>
                        <span>Deliver to</span>
                        <p>{emailSubmitted}</p>
                        <button onClick={handleOpenClick}>Change</button>
                    </div>
            </div> */}
        </>
    )
}

export default ContactDetailCheckout;

/*
I have this regex

```
import re

a = "aaaeee"
b = "dddbbb"
c = "aaabbb"
d = "bbbaaa"
e = "cccdddaaabbb"
f = "cccdddbbbaaa"
g = "cccbbbaaaddd"
h = "cccaaabbbddd"
i = "aaacccbbbddd"
j = "aaacccdddbbb"

# returns false for a and b

# returns true for all else 
# btw u need to use findall over match
regex = re.compile(r"[^a|b]*a+[^a|b]*b+[^a|b]*|[^a|b]*b+[^a|b]*a+[^a|b]*", re.IGNORECASE)

[c-d]*a+[c-d]*b+[c-d]*|[c-d]*b+[c-d]*a+[c-d]*

result = re.findall(regex, c)

# returns true
``` 
*/