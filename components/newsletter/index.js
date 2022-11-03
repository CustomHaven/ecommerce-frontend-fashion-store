import React, { useState } from "react";
import styles from "../../styles/Newsletter.module.css";

const Newsletter = () => {

    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        console.log("typed!");
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log("Handle Submit pressed!");
        e.preventDefault();
        console.log(email);
    }

    return (
        <article className={styles.newsletter}>
            <div>
                <h4>Sign up for Newsletters</h4>
                <p>Get email updates about our latest shop's <span>special offers</span></p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your email address" name="email" onChange={handleChange} />
                <button>Sign Up</button>
            </form>
        </article>
    );
}

export default Newsletter;