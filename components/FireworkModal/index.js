import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetOrders } from "../../feature/orderSlice/orderSlice";
import { resetPaymentStrings } from "../../feature/paymentSlice/paymentSlice";
import { resetUpdatedProducts } from "../../feature/productSlice/productSlice";
import { selectFirstName, selectLastName, fullResetContactDetails } from "../../feature/contactDetailSlice/contactDetailSlice";
import { selectEmail, completeResetUserStates } from "../../feature/userSlice/userSlice";
import { logoutPerson, selectLoginProfile } from "../../feature/authSlice/authSlice";
import { toggleCelebrateNewOrder, defaultLogoutFeature } from "../../feature/generalComponents/generalComponentSlice";
import { removeCart, updateShippingMethod, restartCartDeliveryInformation,
    updateCartTotalPrice, updateCartTotalPriceWithShipping, updateShippingPrice } from "../../feature/cartSlice/cartSlice";
import { adminHeaders } from "../../utils/generalUtils";
import styles from "../../styles/FireworkModal.module.css"

const FireWorkModal = () => {
    const ref = useRef(null);
    const buttonRef = useRef(null);
    const [logout, setLogout] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const loginProfile = useSelector(selectLoginProfile);
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);

    const handleContinue = (e) => {
        buttonRef.current.disabled = true;

        // Restart the user states!
        dispatch(completeResetUserStates());

        // handle Logout
        setLogout(false);
        localStorage.removeItem("refresh_token");

        dispatch(defaultLogoutFeature(true));

        dispatch(logoutPerson({}));
        fetch("/api/signout", {
            method: "POST",
            headers: adminHeaders(loginProfile.token, "refresh"),
            body: JSON.stringify({static: "key"}),
            credentials: "include"
        }).then(res => res.json()).then(res => { 
            console.log("final res what?!", res);
            dispatch(logoutPerson({}));
            setLogout(true);
        });


        // Reset Payment Infos
        dispatch(resetPaymentStrings());


        // Restart the cart!
        dispatch(restartCartDeliveryInformation());
        dispatch(updateShippingMethod(""));
        dispatch(updateShippingPrice());
        dispatch(updateCartTotalPrice(0));
        dispatch(updateCartTotalPriceWithShipping(0));
        dispatch(removeCart());

        // Reset the updated products array!
        dispatch(resetUpdatedProducts());

        // Reset the order states!
        dispatch(resetOrders());

    }

    useEffect(() => {
        if (ref.current) {
            ref.current.classList.add(styles.createbox_animation);
        }
    }, []);

    useEffect(() => {
        if (logout) {
            ref.current.classList.add(styles.createbox_animation);
            ref.current.classList.add(styles.removebox_animation);
    
            setTimeout(() => {
                // Full reseting the contact details will do at the end!
                dispatch(fullResetContactDetails());
                dispatch(toggleCelebrateNewOrder(false));
                router.push("/");
            }, 1500);
        }
    }, [logout]);

    return (
        <section className={[styles.main_container, styles.createbox_animation].join(" ")} ref={ref}>
            <div className={styles.success_container}>
                <div className={styles.msg_success}>
                    <div className={styles.letter}></div>
                </div>
                <div className={styles.shadow}></div>
                <h1 className={styles.title}>Thank you {firstName}!</h1>
                <p className={styles.message}>Your order summary was delivered to {email} successfully. (check your spam folder as well)</p>
                <button ref={buttonRef} className={[styles.btn, styles.btn_success].join(" ")} onClick={handleContinue}>Continue</button>
            </div>
        </section>
    )
}

export default FireWorkModal;