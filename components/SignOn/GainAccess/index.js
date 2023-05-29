import Link from "next/link";
import { useState } from "react";
import Canvas from "../../canva";

// Parent Component for both Login and Register Components as these two are very similar 
// I dont know what I should name this component exactly can't name it Login or Register 
// as I am using conditional rendering to determine what to display based on what path extension the client is in
const GainAccess = (props) => {
    const { styles, header, pageType } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Continue with the submission
        console.log("form submitted");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.gain_access_form}>
                <div className={styles.form_logo}>
                    <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={styles.logo_} />
                </div>
                <header className={styles.form_header}>
                <h4>{header}</h4>
                {
                    pageType === "registerPage" ?
                    <>
                        <h5 className={styles.text_form_size}>Already a member? <span className={styles.login_title}><Link href="/login">Login</Link></span></h5>
                    </> : null
                }
                </header>

                <div className={[styles.user_input_content, styles.form_content].join(" ")}>
                        <div className={styles.form_email}>
                            <label className={styles.text_form_size} htmlFor="Email">Email</label>
                            <input contentEditable="true" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.sign_on_inputs} type="text" name="email" placeholder="Email address" />
                        </div>
                        <div className={styles.form_password}>
                            <label className={styles.text_form_size} htmlFor="Password">Password</label>
                            <input contentEditable="true" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.sign_on_inputs} type="password" name="password" />
                        </div>                        
                        {
                            pageType === "registerPage" ?
                            <div className={styles.optional_div}>
                                <div>
                                    <label className={styles.text_form_size} htmlFor="Confirm Password">Confirm Password</label>
                                    <input contentEditable="true" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.sign_on_inputs} type="password" name="password" />
                                </div>
                                <div className={styles.email_subscription}>
                                    <input type="checkbox" name="emailSubCheckbox" />
                                    <label className={styles.text_form_size} htmlFor="Email Subscription">Subscribe for deals and coupons</label>
                                </div> 
                            </div>
                            : 
                            <div className={[styles.login_info_fallbacks, styles.optional_div].join(" ")}>
                                <span className={styles.text_form_size}>
                                    <Link href="reset-password">Forgot Password?</Link>
                                </span>
                                <p className={styles.text_form_size}><Link href="/register">Not a member, register now!</Link></p>
                            </div>
                        }
                    <input type="submit" value={pageType === "registerPage" ? "Register" : "Login"} className={[styles.submit_form, styles.submission_elem].join(" ")} />
                </div>
            </form>
        </>
    )
}

export default GainAccess;