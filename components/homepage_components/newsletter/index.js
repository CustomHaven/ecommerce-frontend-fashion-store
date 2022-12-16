import { useState } from "react";
import styles from "../../../styles/homepage/Newsletter.module.css";


const Newsletter = () => {

    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        console.log("typed!");
        setEmail(e.target.value);
        console.log(email)
    }

    const handleSubmit = (e) => {
        console.log("Handle Submit pressed!");
        e.preventDefault();
        console.log(email);
    }

    return (
        <article className={styles.newsletter}>
            <div>
                <div className={styles.left}>
                    <h4>Sign up for Newsletters</h4>
                    <p>Get email updates about our latest shop's <span>special offers</span></p>
                </div>
                <div className={styles.right}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your email address" name="email" onChange={handleChange} />
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        </article>
    );
}

export default Newsletter;