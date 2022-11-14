import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Canvas from "../../canva";
import { fireNavHeader, selectNavHeader } from "../../../feature/generalComponents/generalComponentSlice";
import styles from "../../../styles/Burger.module.css";
import Menu from "./menu";
import MenuPart from "./menu/MenuPart";
import { monitorMediaForCanvaWidth } from "../../../utils/mediaQuery";
import useQuerySelector from "../../../hooks/useQuerySelector";

const Burger = (props) => {

    const sidebarMenuRef = useQuerySelector("#sidebar-menu");
    const [clicked, setClicked] = useState(false);

    const sidebar = useRef(null);

    // console.log("sidebar is it called?!", sidebarMenuRef);

    // const [windowWidth, setWindowWidth] = useState(process?.title === "browser" ? window.innerWidth : null);
    const [canvaHeight] = useState(60); // 180?
    // const [heightCanva, setHeightCanva] = useState(180);

    const headerNav = useSelector(selectNavHeader);

    const [menuClick, setMenuClick] = useState(false);
    const handleClick = () => {
        // console.log("querySelector", sidebarMenuRef);
        // sidebarMenuRef.current.styles.right = 0;
        setMenuClick(true);
        // if (sidebarMenuRef.current !== null) {
        //     sidebarMenuRef.current.classList.remove(styles.sidebar_slide_out_right);
        //     sidebarMenuRef.current.classList.add(styles.sidebar_slide_in_right);
        // }

        // console.log("handleCLick done", sidebarMenuRef)
        // sidebar.current = sidebarMenuRef.current;

    }

    // const closeSideBar = () => {
    //     console.log("inside closeSidebar before the if", sidebarMenuRef.current);

    //     if (sidebar.current !== null && menuClick === true) {
    //         console.log("inside closeSidebar", sidebarMenuRef.current);
    //     sidebarMenuRef.current.classList.remove(styles.sidebar_slide_in_right);
    //     sidebarMenuRef.current.classList.add(styles.sidebar_slide_out_right);
    //     console.log("props.menuClick", sidebarMenuRef);
    //     setTimeout(setMenuClick, 300, false);
    //     }
    // }

    // useEffect(() => {
    //     // closeSideBar()

    //     // closeSideBar();
    //     // if (sidebarMenuRef.current !== null) {
    //     // console.log("classList", sidebarMenuRef.current.classList);
    //     // }
    //     if (menuClick === false)
    //     if (sidebarMenuRef.current !== null) {
    //         if (menuClick === true) {
    //             // <MenuPart />
    //             console.log("sidebar is it called?!", sidebarMenuRef);
    //             // sidebarMenuRef.current.style.transition = "right 2s ease-in-out";
    //             // sidebarMenuRef.current.style.right = 0;
    //             // sidebarMenuRef.current.classList.remove(styles.sidebar_slide_out_right);
    //             sidebarMenuRef.current.classList.add(styles.sidebar_slide_in_right);
    //             sidebarMenuRef.current.classList.add(styles.menu_drawer_logo);
    //         }
    //     }
    // }, [menuClick, sidebarMenuRef.current]);

    return (
        // <header className={props.headerNavbar}>
        <>
            {
                process?.title === "browser" && menuClick === true ?
                <>
                {/* <nav className={styles.burger_nav}> */}
                <MenuPart
                    menuClick={menuClick}
                    navStyles={props.navStyles}
                    heightCanva={props.heightCanva}
                    logo={props.logo}
                    setMenuClick={() => setMenuClick()}
                    closeSideBar={() => closeSideBar()}
                />
                {/* <div className={styles.burger_closer}>
                    <AiOutlineClose onClick={closeClick}/>
                </div> */}
                {/* </nav> */}


{/* focus here below for burger down */}
                </>:
                <nav className={styles.burger_nav}>
                    <Link href="/" className={styles.logo_link}>
                        <Canvas 
                            src="/assets/custom-haven-monkey-small.png" 
                            // height={props.heightCanva} 
                            className={props.logo} 
                        />
                    </Link>
                    <div>
                        <GiHamburgerMenu onClick={handleClick} />
                    </div>
                </nav>
            }
        </>
    );
};

export default Burger;