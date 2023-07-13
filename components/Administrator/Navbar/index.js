import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuerySelector from "../../../hooks/useQuerySelector";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Canvas from "../../canva";
import { selectAsideSwitch, adminHeaderController } from "../../../feature/generalComponents/generalComponentSlice";
import styles from "../../../styles/Administrator/AdminNavbar.module.css";

const AdminNavbar = () => {
    const [fullSize, setFullSize] = useState(false);
    const switchRef = useRef(null);
    const dispatch = useDispatch();
    const asideSwitch = useSelector(selectAsideSwitch);
    const root = useQuerySelector(":root");
    const asideMenu = useQuerySelector("#admin__aside__id");
    const { media } = useMediaQuery(700);
    const { windowWidth } = useWindowDimensions();


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


    return (
        <nav className={styles.admin_nav_header}>
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
                        <p className={styles.admin_text_sizes}>Haven</p>
                    </li>
                    <li>
                        <div className={styles.admin_initials}><p className={styles.admin_text_sizes}>CH</p></div>
                    </li>
                    <li>
                        <FiLogOut />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default AdminNavbar;