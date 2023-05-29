import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFecth from "../../hooks/useFetch";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { saveFirstName,
    saveLastName,
    saveAddressLine1,
    saveAddressLine2,
    saveTownCity,
    savePostcode,
    saveCountry,
    saveCountryCode,
    savePhoneNumber, selectCountryCode } from "../../feature/contactDetailSlice/contactDetailSlice";
import { insertHyphen, validatePhoneNumber } from "../../utils/contactFormValidation";
import { sortArrayObjectForString } from "../../utils/generalUtils";
import styles from "../../styles/ContactInformationForm.module.css";

const ContactInformation = (props) => {
    const { submit_input, header, countryCodeRefSpan, countryCodeRefSelect } = props;
    const [spanRefState, setSpanRefState] = useState(countryCodeRefSpan.current);
    const [selectRefState, setSelectRefState] = useState(countryCodeRefSelect.current);
    const [leftPadding, setLeftPadding] = useState("");
    const { windowWidth } = useWindowDimensions();
    const dispatch = useDispatch();
    const countryRef = useRef(null);
    
    const [countryData] = useFecth("https://countries.trevorblades.com/graphql", "POST", {"Content-type": "application/json"}, {query: `
        query {
            countries {
                name
                phone
            }
        }
    `});

    const inputPaddingLeftFunc = () => {
        if (spanRefState !== null) {
            if (windowWidth <= 1550) {
                setLeftPadding("9%");
            } else {
                setLeftPadding("8%");
            }
        } else if (selectRefState !== null) {
            if (windowWidth <= 1600 && windowWidth > 1550) {
                setLeftPadding("13%");
            } else if (windowWidth <= 1550) {
                console.log("are we in here!???")
                setLeftPadding("14%");
            } else {
                setLeftPadding("12%");
            }
        } else {
            setLeftPadding("0");
        }
    };

    const [hydrate, setHydrate] = useState(false);

    const [country, setCountry] = useState("Select a country");
    const [countryPhone, setCountryPhone] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [town, setTown] = useState("");
    const [postcode, setPostcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const extractPhone = (place) => {
        const multiplePhoneCodes = place.replace(/[^\+\d\,]*/g, "");
        const arrayPhoneCodes = multiplePhoneCodes.split(",");
        if (arrayPhoneCodes.length > 1) {
            setCountryPhone(arrayPhoneCodes);
        } else {
            setCountryPhone(arrayPhoneCodes[0]);
        }
        return arrayPhoneCodes;
    }

    const handleCountry = (e) => {
        setPhoneNumber("");
        setCountry(e.target.value);
        extractPhone(e.target.value);
        dispatch(saveCountry(e.target.value.replace(/[^a-z\s]/gi, "").trim()));
    };
    const handleFName = (e) => {
        setFName(e.target.value);
        dispatch(saveFirstName(e.target.value));
    };
    const handleLName = (e) => {
        setLName(e.target.value);
        dispatch(saveLastName(e.target.value));
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
        dispatch(saveAddressLine1(e.target.value));
    };
    const handleApartment = (e) => {
        setApartment(e.target.value);
        dispatch(saveAddressLine2(e.target.value));
    };
    const handleTown = (e) => {
        setTown(e.target.value);
        dispatch(saveTownCity(e.target.value));
    };
    const handlePostcode = (e) => {
        setPostcode(e.target.value);
        dispatch(savePostcode(e.target.value));
    };

    const handlePhoneNumber = (e) => {
        const reg = new RegExp(/^[\d-]*$/g)
        if (!reg.test(e.target.value)) {
            return;
        }
        const inputFieldModified = insertHyphen(e.target.value, 3);
        setPhoneNumber(inputFieldModified);

        // const outcome = validatePhoneNumber(inputFieldModified, country);

        // console.log("what is the outcome?", outcome);

        dispatch(savePhoneNumber(inputFieldModified));
        /* "+44 123456 7890" "+44 079 456 7890" * "+1 555 555 1234" * "+252 615 555 555" * "+1 416 1234 5678" * +966 123 456 789 */
        // "^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$"

        // ^(\+\d{1,3}[\s-])?\(?\d{3}\)?[\s-]?\d{3,4}[\s-]?\d{3,5}$   use this regex instead
    };


    const handleSubmit = (e) => {
        console.log("handle submit!!");
        e.preventDefault();
    };


    // console.log("OUTSIDE SEE SELECT!", countryCodeRefSelect);

    useEffect(() => {
        setHydrate(true);
    }, []);

    useEffect(() => {
        setSpanRefState(countryCodeRefSpan.current);
        setSelectRefState(countryCodeRefSelect.current);
    });

    useEffect(() => {
        inputPaddingLeftFunc();
    }, [spanRefState, selectRefState, windowWidth]);

    return (
        <>
        {
            hydrate ?
        <form className={styles.contact_information_form} onSubmit={handleSubmit}>
            <h4>{header}</h4>
            <label htmlFor="country">Country</label>
            {/* <input value={country} onChange={handleCountry} type="text" name="country" placeholder="Country" /> */}
            <select ref={countryRef} onChange={handleCountry}>
                <option selected hidden>Select a country</option>
                {
                    countryData !== null &&
                    countryData.data.countries.sort((a, b) => sortArrayObjectForString(a, b, "name")).map(country => 
                        <option value={`${country.name} (${country.phone})`}>{country.name} ({country.phone})</option>
                    )
                }
            </select>
            {/* </select> value={country} onChange={handleCountry} type="text" name="country" placeholder="Country" /> */}
            <div>
                    <label className={styles.left_labels} htmlFor="first_name">First Name</label>
                    <input value={fName} onChange={handleFName} className={styles.left_inputs} type="text" name="first_name" placeholder="First Name" />
                    <label className={styles.right_labels} htmlFor="last_name">Last Name</label>
                    <input value={lName} onChange={handleLName} className={styles.right_inputs} type="text" name="last_name" placeholder="Last Name" />
            </div>
            <label htmlFor="address_line1">Address</label>
            <input id={"country_id"} value={address} onChange={handleAddress} type="text" name="address_line1" placeholder="Address" />
            <label htmlFor="address_line2">Apartment, Suit (<span>optional</span>)</label>
            <input value={apartment} onChange={handleApartment} type="text" name="address_line2" placeholder="Apartment,suit,etc. (optional)" />
            <div>
                    <label className={styles.left_labels} htmlFor="town_city">Town/City</label>
                    <input value={town} onChange={handleTown} className={styles.left_inputs} type="text" name="town_city" placeholder="Town or City" />
                    <label className={styles.right_labels} htmlFor="zip_code">Postcode</label>
                    <input value={postcode} onChange={handlePostcode} className={styles.right_inputs} type="text" name="zip_code" placeholder="Postcode / Zipcode" />
            </div>

            <div className={styles.phone_number_form}>
                <label htmlFor="phone_number">Phone Number (<span>optional</span>)</label>
                <input 
                    style={{paddingLeft: leftPadding}} 
                    value={phoneNumber} onChange={handlePhoneNumber} 
                    type="text" name="phone_number" placeholder="Phone (optional)" />
                {
                    country === "Select a country" ?
                    null :
                    typeof countryPhone === "string" ?
                    <span ref={countryCodeRefSpan}>{countryPhone}</span> :
                    <span>
                        <select ref={countryCodeRefSelect}>
                            {
                                countryPhone.map(phone => <option value={phone}>{phone}</option>)
                            }
                        </select>
                    </span>
                }
            </div>

            {
                submit_input ? 
                <div className={styles.submit_contact_form}>
                    <input type="submit" value={"Continue To Payment Information"} />
                </div> : null
            }
        </form> : null
        }
        </>
    )
}

export default ContactInformation;