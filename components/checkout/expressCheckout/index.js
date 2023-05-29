import Image from "next/image";
import styles from "../../../styles/checkoutpage/ExpressCheckout.module.css";

const ExpressCheckout = (props) => {
    return (
        <>
        {
            props.closeAccordion === false ?
            <div id="express_checkout" className={styles.checkout_express_checkout}>
                <div>
                    <button className={styles.stripe}>
                        <div>
                            <Image fill src="/assets/stripe_croped.png" alt="stripe_express_service" />
                        </div>
                    </button>
                    <button className={styles.paypal}>
                        <div>
                            <Image fill src="/assets/paypal_croped.png" alt="paypal_express_service" />
                        </div>
                    </button>
                </div>
                <p className={styles.express_text}>&nbsp;Express Checkout&nbsp;</p>
            </div>
            : null
        }
        </>
    );
};

export default ExpressCheckout;