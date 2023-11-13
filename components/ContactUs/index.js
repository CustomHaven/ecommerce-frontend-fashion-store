import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import ReactLoading from "react-loading";
import emailjs from "@emailjs/browser"; // not using this doing the work in the backend instead
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { insertHyphen, emailValidator, validatePhoneNumber } from "../../utils/contactFormValidation";
import { headers, sortArrayObjectForString } from "../../utils/generalUtils";
import styles from "../../styles/ContactUs.module.css";

const ContactUs = (props) => {

    const formRef = useRef(null);
    const countryRef = useRef(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [countryCode, setCountryCode] = useState("+44");
    const [smallCC, setSmallCC] = useState("50px"); // initally these values on big screen 50px
    const [mediumCC, setMediumCC] = useState("60px"); // initally these values on big screen 60px
    const [largeCC, setLargeCC] = useState("70px"); // initally these values on big screen 70px

    const [emailLoading, setEmailLoading] = useState(false);
    const [mail, setMail] = useState(null);
    const [mailError, setMailError] = useState(null);

    const [query, setQuery] = useState("");

    const { windowWidth } = useWindowDimensions();

    const [countryData] = useFetch(props.countryData, "POST", {"Content-type": "application/json"}, {query: `
        query {
            countries {
                name
                phone
            }
        }
    `});

    const handleSubmit = (e) => {
        e.preventDefault();
        let tempEmailError, tempPhoneError;
        if (!emailValidator(email)) {
            // console.log("invalid email address!");
            setEmailError("Invalid Format");
            tempEmailError = "Invalid Format";
            // return;
        }

        const validPhoneNumber = validatePhoneNumber(phoneNumber, countryCode);
        if (validPhoneNumber === "failed") {
            // console.log("invalid phone number!");
            setPhoneError("Invalid Format");
            tempPhoneError = "Invalid Format";
            // return;
        }

        if (tempEmailError || tempPhoneError) {
            return;
        }

        const fName = firstName.replace(/\w\S*/g, (a) => a.length > 2 ? a.charAt(0).toUpperCase() + a.slice(1).toLowerCase() : a.toLowerCase());
        const lName = lastName.replace(/\w\S*/g, (a) => a.length > 2 ? a.charAt(0).toUpperCase() + a.slice(1).toLowerCase() : a.toLowerCase());


        const tempMail = {
            user_name: fName + " " + lName,
            // last_name: lName,
            subject: "Customer Contacts Store",
            user_email: email,
            message: query
        };

        setEmailLoading(true);
        fetch("/api/customer_query", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(tempMail)
        }).then(async res => {
            if (res.ok) {
                return await res.json();
            } else {
                throw await res.json();
            }
        }).then(res => {
            if (res) {
                console.log("in the end we got the mail response!", res);
                setMail(res);
                setEmailLoading(false);
            }
        })
        .catch(err => {
            console.error("mail error", err);
            setEmailLoading(false);
            setMailError(err);
        });
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };


    const handleCountry = (e) => {
        setPhoneNumber("");
        const cc = "+" + e.target.value.replace(/[^\d]/g, "");
        setCountryCode(cc);
    };


    const handlePhoneNumber = (e) => {
        const reg = new RegExp(/^[\d-]*$/g);
        if (!reg.test(e.target.value)) {
            return;
        }
        const inputFieldModified = insertHyphen(e.target.value, 3);
        setPhoneNumber(inputFieldModified);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleTextArea = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        if (windowWidth <= 560 && windowWidth >= 451) {
            setLargeCC("65px");
            setMediumCC("55px");
            setSmallCC("45px");
        } else if (windowWidth <= 450 && windowWidth >= 351) {
            setLargeCC("55px");
            setMediumCC("50px");
            setSmallCC("42px");
        } else if (windowWidth <= 350 && windowWidth >= 291) {
            setLargeCC("47px");
            setMediumCC("43px");
            setSmallCC("38px");
        } else if (windowWidth <= 290 && windowWidth > 0) {
            setLargeCC("43px");
            setMediumCC("39px");
            setSmallCC("35px");
        } else {
            setLargeCC("70px");
            setMediumCC("60px");
            setSmallCC("50px");
        }
    }, [windowWidth]);

    useEffect(() => {
        if (mail) {
            // not using emailjs doing this instead in the backend for security!
            // emailjs.sendForm(props.eService, props.eTemplate, formRef.current, props.ePublic).then((result) => {
            //     console.log(result);
            //     console.log(result.text);
            //     console.log("WORKED EMAIL SENT!");
            // }, (error) => {
            //     console.log(error.text);
            //     console.log("FAILED EMAIL DID NOT SEND!");
            // });
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setQuery("");
            setMail(null);
            setMailError(null);
        }
    }, [mail]);

    useEffect(() => {
        if (mailError) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setQuery("");
            setMail(null);
        }
    }, [mailError])

    return (
        <section data-white className={styles.contact_us_main_container}>
            <div className={styles.contact_us_main_sections}>

                <div className={styles.contact_us_img_section}>
                    <div className={styles.contact_us_img_container}>
                        <Image priority src={props.src} fill contain="true" alt="Contact Us" />
                    </div>
                    <p>Ask us what you need!</p>
                </div>


                <div className={styles.contact_us_form_section}>
                    <form onSubmit={handleSubmit}>
                        <header className={styles.contact_us_form_header}>
                            <h2>Talk to the sales team</h2>
                            <span>Fields marked with an asterisk (*) is required</span>
                        </header>

                        {
                            emailLoading &&
                                <div className={styles.loading}>
                                    <ReactLoading className={styles.loadings} type={"bars"} height={100} width={100}  />
                                </div>
                        }
                        

                        <div className={styles.contact_us_form_inputs}>
                            <div>
                                <div className={[styles.left_label_inputs, styles.first_name].join(" ")}>
                                    <label className={styles.left_label} htmlFor="first_name">First Name<strong className={styles.astrisk}>*</strong></label>
                                    <input onChange={handleFirstName} value={firstName} required className={styles.left_inputs} type="text" name="first_name" placeholder="First Name" />
                                </div>

                                <div className={[styles.right_label_inputs, styles.last_name].join(" ")}>
                                    <label className={styles.right_label} htmlFor="last_name">Last Name<strong className={styles.astrisk}>*</strong></label>
                                    <input onChange={handleLastName} value={lastName} required className={styles.right_inputs} type="text" name="last_name" placeholder="Last Name" />
                                </div>

                                <div className={[styles.left_label_inputs, styles.phone].join(" ")}>
                                    <label className={styles.left_label} htmlFor="phone_number">Phone number</label>
                                    <span className={[styles.country_span, phoneError ? styles.red_input : ""].join(" ")} >
                                        <select ref={countryRef} onChange={handleCountry} value={countryCode} style={{ width: countryCode.replace(/\+/, "").length === 2 ? smallCC : countryCode.replace(/\+/, "").length === 3 ? mediumCC : largeCC }}>
                                            <option hidden selected value={"United Kingdom (" + countryCode + ")"}>{countryCode}</option>
                                                {
                                                    countryData !== null &&
                                                    countryData.data.countries.sort((a, b) => sortArrayObjectForString(a, b, "name")).map(country => 
                                                        <option value={`${country.name} (${country.phone})`}>{country.name} ({country.phone})</option>
                                                    )
                                                }
                                        </select>
                                    </span>
                                    <input value={phoneNumber} onChange={handlePhoneNumber} className={[styles.left_inputs, phoneError ? styles.red_input : ""].join(" ")} type="text" name="phone_number" placeholder="Phone number" style={{ paddingLeft: countryCode.replace(/\+/, "").length === 2 ? smallCC : countryCode.replace(/\+/, "").length === 3 ? mediumCC : largeCC }} />
                                    {
                                        phoneError ? <div className={styles.tool}><span>{phoneError}</span></div> : null
                                    }
                                </div>

                                <div className={[styles.right_label_inputs, styles.email].join(" ")}>
                                    <label className={styles.right_label} htmlFor="email">Email<strong className={styles.astrisk}>*</strong></label>
                                    <input onChange={handleEmail} value={email} required className={[styles.right_inputs, emailError ? styles.red_input : ""].join(" ")} type="text" name="email" placeholder="Email" />
                                    {
                                        emailError ? <div className={styles.tool}><span>{emailError}</span></div> : null
                                    }
                                </div>
                            </div>
                            <div>
                                <label className={styles.label} htmlFor="question_query"><strong>What would you like to discuss?<strong className={styles.astrisk}>*</strong></strong></label>
                                <textarea value={query} onChange={handleTextArea} required className={styles.contact_us_textarea} id={"question_query"} type="text" name="question_query" placeholder="Talk to us about any query you have regarding the store."></textarea>
                            </div>

                            <input type="submit" value="SUBMIT" />
                        </div>


                    </form>
                </div>
            </div>

            {
                mail !== null &&
                <form ref={formRef} style={{ display: "hidden", width: "0px", height: "0px" }}>
                    <input name="user_name" value={mail.user_name} />
                    <input name="user_email" value={mail.user_email} />
                    <textarea name="message" value={mail.message}></textarea>
                </form>
            }
        </section>
    )
}

export default ContactUs;