import Link from "next/link";
import {  useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Canvas from "../../canva";
import { saveNewUserThunk, findUserByEmailThunk, selectUserProfile } from "../../../feature/userSlice/userSlice";
import { loginUserAuth, refreshAuth, selectLoginProfile, selectLoginError, loginPerson } from "../../../feature/authSlice/authSlice";
import { defaultLogoutFeature } from "../../../feature/generalComponents/generalComponentSlice";
import { fetchMethod } from "../../../utils/generalUtils";

// Parent Component for both Login and Register Components as these two are very similar 
// I dont know what I should name this component exactly can't name it Login or Register 
// as I am using conditional rendering to determine what to display based on what path extension the client is in
const GainAccess = (props) => {
    const { styles, header, pageType } = props;
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordNotSame, setPasswordNotSame] = useState(false);
    const [fetchLLoading, setFetchLoading] = useState(false);
    const [loginData, setLoginData] = useState();

    // useFecth("/api/cookie", "GET", { "Accept": "application/json", "Content-Type": "application/json" }, {
    //     user: userDone, token: getToken.token, refresh_token: token,
    //     expiration: expirationTime
    // })

    const emailSubRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const dispatch = useDispatch();
    const loginError = useSelector(selectLoginError);
    const loginProfile = useSelector(selectLoginProfile);
    const userProfile = useSelector(selectUserProfile);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pageType === "registerPage") {
            if (password !== confirmPassword) {
                alert("Password and Confirm Password does not match");
                setPasswordNotSame(true);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                emailSubRef.current.checked = false;
                return;
            }

            dispatch(saveNewUserThunk({ email, password, confirmPassword, emailCampaign: emailSubRef.current.checked }));

            // console.log("LOGIN WAS success!!!!!")
            router.push("/login");

        } else {
            setFetchLoading(true);
            fetchMethod("/api/access", "POST", {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }, {
                email: email,
                password: password
            }).then(res => {console.log("what is res?", res); return res}).then(res => { dispatch(loginPerson(res)); setFetchLoading(false); });
            // dispatch(loginUserAuth({ email, password }));
            
        }

    }

    useEffect(() => {
        if (passwordNotSame && (email.length > 0 || password.length > 0 || confirmPassword.length > 0)) {
            setPasswordNotSame(false);
        }
        if (invalidCredentials && (email.length > 0 || password.length > 0)) {
            setInvalidCredentials(false);
        }
    }, [email, password, confirmPassword]);

    useEffect(() => {
        if (loginProfile.user) {
            if (loginProfile.user.id) {
                dispatch(findUserByEmailThunk({ email: email }));
                // setStartLoginRefresh(true);
                // setEmail("");
                // setPassword("");
                // router.push("/admin/dashboard");
                console.log("loginProfile!!!!!!!!!", loginProfile);
                localStorage.setItem("refresh_token", loginProfile.refresh_token);
                // setFetchLoading(true);
                // fetchMethod("/api/access", "POST", {
                //     "Accept": "application/json",
                //     "Content-Type": "application/json",
                // }, {
                //     user: loginProfile.user,
                //     access_token: loginProfile.token,
                //     refresh_token: loginProfile.refresh_token,
                //     expiration: loginProfile.expiration
                // }).then(res => res.json()).then(res => { setLoginData(res); setFetchLoading(false); });
                setEmail("");
                setPassword("");
            }
        }

        if (loginError) {
            setEmail("");
            setPassword("");
            setInvalidCredentials(true);
        }
    }, [loginError, loginProfile]);

    useEffect(() => {
        if (userProfile.id) {
            setFetchLoading(true);
            fetchMethod("/api/refresh", "POST", {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }, {
                refresh_token: localStorage.getItem("refresh_token")
            }).then(res => { console.log("final res what is it?", res); return res }).then(res => { dispatch(loginPerson(res)); setFetchLoading(false); });

            // console.log("loginData IN THE END??", loginData);
            // dispatch(refreshAuth({ refresh_token: localStorage.getItem("refresh_token") }));
            console.log("loginProfile BEFORE ADMIN PAGE", loginProfile);
            if (loginProfile.user.role === "Administrator") {
                router.push("/admin/dashboard");
            } else {
                dispatch(defaultLogoutFeature(false));
                router.push("/");
            }
        }
    }, [process?.title === "browser" && localStorage.getItem("refresh_token"), userProfile]);

    // }, [startLoginAccess]);

    // useEffect(() => {
    //     if (loginProfile.refresh_token) {
    //         dispatch(refreshAuth({ refresh_token: loginProfile.refresh_token }));
    //         setEmail("");
    //         setPassword("");
    //         router.push("/");
    //     }
    // }, [startLoginRefresh]);

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
                        <div style={{position: "relative"}} className={styles.form_password}>
                            <label className={styles.text_form_size} htmlFor="Password">Password</label>
                            <input contentEditable="true" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.sign_on_inputs} type="password" name="password" />
                            {
                                invalidCredentials &&
                                    <div 
                                        className={[styles.tooltip__bottom, styles.tooltip].join(" ")}
                                        data-tooltip="Invalid Credentials!"
                                        style={{ 
                                            zIndex: 1000, 
                                            position: "absolute", 
                                            width: "5px", 
                                            height: "5px", 
                                            backgroundColor: "transparent", 
                                            bottom: 0, 
                                            right: "50%"
                                        }}> 
                                    </div>
                            }
                        </div>                        
                        {
                            pageType === "registerPage" ?
                            <div className={styles.optional_div}>
                                <div style={{position: "relative"}}>
                                    <label className={styles.text_form_size} htmlFor="Confirm Password">Confirm Password</label>
                                    <input
                                        ref={confirmPasswordRef}
                                        contentEditable="true" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        className={[styles.sign_on_inputs, styles.tool_tip].join(" ")} 
                                        type="password" 
                                        name="password"
                                        data-tooltip="Password and Confirm Password must be the same!"
                                    />
                                    {
                                        passwordNotSame &&
                                        <div 
                                            className={[styles.tooltip__bottom, styles.tooltip].join(" ")}
                                            data-tooltip="Password and Confirm Password must be the same!"
                                            style={{ 
                                                zIndex: 1000, 
                                                position: "absolute", 
                                                width: "5px", 
                                                height: "5px", 
                                                backgroundColor: "transparent", 
                                                bottom: 0, 
                                                right: "50%"
                                            }}> 
                                        </div>
                                    }

                                    
                                </div>
                                <div className={styles.email_subscription}>
                                    <input ref={emailSubRef} type="checkbox" name="emailSubCheckbox" />
                                    <label
                                        className={styles.text_form_size} htmlFor="Email Subscription">Subscribe for deals and coupons</label>
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