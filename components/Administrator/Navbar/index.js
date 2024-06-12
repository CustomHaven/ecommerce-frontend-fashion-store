import { useState, useEffect, useRef } from "react";
import {  useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useQuerySelector from "../../../hooks/useQuerySelector";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Canvas from "../../canva";
import { fetchMethod, headers, adminHeaders } from "../../../utils/generalUtils";
import { userLogedout, selectUserProfile } from "../../../feature/userSlice/userSlice";
import { logoutPerson, logoutUserAuth, selectLoginProfile } from "../../../feature/authSlice/authSlice";
import { selectAsideSwitch, adminHeaderController, defaultLogoutFeature } from "../../../feature/generalComponents/generalComponentSlice";
import styles from "../../../styles/Administrator/AdminNavbar.module.css";

const AdminNavbar = () => {
    const router = useRouter();
    const [fullSize, setFullSize] = useState(false);
    const switchRef = useRef(null);
    const dispatch = useDispatch();
    const loginProfile = useSelector(selectLoginProfile);
    const asideSwitch = useSelector(selectAsideSwitch);
    const userProfile = useSelector(selectUserProfile);
    const root = useQuerySelector(":root");
    const asideMenu = useQuerySelector("#admin__aside__id");
    const { media } = useMediaQuery(700);
    const { windowWidth } = useWindowDimensions();
    const [logout, setLogout] = useState(false);

    console.log("what is the logout value: ", logout);

    const handleLogout = () => {
        setLogout(false);
        localStorage.removeItem("refresh_token");
        // fetchMethod("/api/refresh", "POST", headers, {
        dispatch(defaultLogoutFeature(true));
        // dispatch(userLogedout({}));
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
        // fetchMethod("/api/signout", "GET", headers, {}, true)
        //     .then(res => { console.log("final res what is it?", res.json()); return res })
        //     .then(res => { setLogout(true) });
        // dispatch(logoutUserAuth());
        // router.push("/");
    }


    const handleAsideSwitch = () => {
        if (asideSwitch) {
            switchRef.current.disabled = true;
            switchRef.current.style.cursor = "not-allowed";

            setTimeout(() => {
                asideMenu.current.classList.remove("slide-in-left");
                asideMenu.current.classList.add("slide-out-left");
            }, 10);

            setTimeout(() => {
                dispatch(adminHeaderController(!asideSwitch));
                asideMenu.current.style.display = "none";
                switchRef.current.disabled = false;
                switchRef.current.style.cursor = "pointer";
                root.current.style.setProperty("--admin-main-container-grid-size", "1fr");
                setFullSize(true);
            }, 1000);
        } else {
            setFullSize(false);
            if (media) {
                root.current.style.setProperty("--admin-main-container-grid-size", "20vw 1fr");
            } else {
                root.current.style.setProperty("--admin-main-container-grid-size", "10vw 1fr");
            }

            switchRef.current.disabled = true;
            asideMenu.current.style.display = "block";
            switchRef.current.style.cursor = "not-allowed";
            dispatch(adminHeaderController(!asideSwitch));

            setTimeout(() => {
                asideMenu.current.classList.remove("slide-out-left");
                asideMenu.current.classList.add("slide-in-left");
            }, 10);
            setTimeout(() => {
                dispatch(adminHeaderController(!asideSwitch));
                switchRef.current.disabled = false;
                switchRef.current.style.cursor = "pointer";
            }, 1000);
        }
    }

    useEffect(() => {
        if (!fullSize) {
            if (window.innerWidth <= 700 && root.current) {
                root.current.style.setProperty("--admin-main-container-grid-size", "20vw 1fr");
            } else {
                root.current.style.setProperty("--admin-main-container-grid-size", "10vw 1fr");
            }
        }
    }, [root.current, windowWidth]);

    useEffect(() => {
        if (logout === true) {
            router.push("/");
        }
    }, [logout]);


    if (userProfile.id) {
        console.log("ADMIN ID NAVBAR FIRST NAME", userProfile);
        console.log("ADMIN ID NAVBAR SECOND NAME", userProfile);
        if (userProfile.ContactDetails) {
            console.log("ADMIN ContactDetails NAVBAR FIRST NAME", userProfile.ContactDetails);
            console.log("ADMIN ContactDetails NAVBAR SECOND NAME", userProfile);
        }
    }

    return (
        <nav className={[styles.admin_nav_header, "unselectable"].join(" ")}>
            <div ref={switchRef} onClick={handleAsideSwitch} className={styles.admin_header__left}>
                {
                    asideSwitch ? 
                    <AiOutlineMenuUnfold /> :
                    <AiOutlineMenuFold />
                }
            </div>
            <div className={styles.admin_header__middle}>
                <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={"logo"} />
            </div>
            <div className={styles.admin_header__right}>
                <ul className={styles.admin_header_right_list}>
                    <li>
                        <BsFillSunFill />
                    </li>
                    <li>
                        <p className={styles.admin_text_sizes}>
                            {userProfile.ContactDetails !== undefined ? userProfile.ContactDetails.length > 0 && userProfile.ContactDetails[0].last_name : "Haven"}
                        </p>
                    </li>
                    <li>
                        <div className={styles.admin_initials}>
                            <p className={styles.admin_text_sizes}>
                                {userProfile.ContactDetails !== undefined ? userProfile.ContactDetails.length > 0 && userProfile.ContactDetails[0].first_name.slice(0, 1).toUpperCase() + userProfile.ContactDetails[0].last_name.slice(0, 1).toUpperCase() : "CH"}
                            </p>
                        </div>
                    </li>
                    <li title="Logout" onClick={handleLogout}>
                        <FiLogOut />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default AdminNavbar;