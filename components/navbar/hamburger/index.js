import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Canvas from "../../canva";
import { fireNavHeader, selectNavHeader } from "../../../feature/generalComponents/generalComponentSlice";
import styles from "../../../styles/Hamburger.module.css";
import Menu from "./menu";
import { monitorMediaForCanvaWidth } from "../../../utils/mediaQuery";

const Hamburger = (props) => {

    // const [windowWidth, setWindowWidth] = useState(process?.title === "browser" ? window.innerWidth : null);
    const [canvaWidth, setCanvaWidth] = useState(250);
    const [canvaHeight] = useState(60); // 180?
    // const [heightCanva, setHeightCanva] = useState(180);
    console.log(props.logo);
    const headerNav = useSelector(selectNavHeader);

    const [menuClick, setMenuClick] = useState(false);
    const handleClick = () => {
        setMenuClick(true);
    }

    const closeClick = () => {
        setMenuClick(false);
    }

    useEffect(() => {
        // document.addEventListener("DOMContentLoaded", monitorMediaForCanvaWidth(props.windowWidth, setCanvaWidth));
        // window.addEventListener("resize", () => {
        //     // setWindowWidth(window.innerWidth);
        //     monitorMediaForCanvaWidth(props.windowWidth, setCanvaWidth);
        // });

        // document.addEventListener("DOMContentLoaded", () => props.setWindowWidth(props.windowWidth));
        // window.addEventListener("resize", () => props.setWindowWidth(props.windowWidth));
    }, [props.windowWidth]);

    return (
        <header className={props.headerNavbar}>
        
            {
                process?.title === "browser" && menuClick === true ?
                <>
                {/* <nav className={styles.hamburger_nav}> */}
                <Menu 
                    menuClick={menuClick}
                    navStyles={props.navStyles}
                    heightCanva={props.heightCanva}
                    logo={props.logo}
                />
                <div className={styles.hamburger_closer}>
                    <AiOutlineClose onClick={closeClick}/>
                </div>
                {/* </nav> */}

                </>:
                <nav className={styles.hamburger_nav}>
                    <Link href="/" className={props.logoLink}>
                        <Canvas 
                            src="/assets/custom-haven-monkey-small.png" 
                            width={canvaWidth} 
                            height={props.heightCanva} 
                            className={props.logo} 
                        />
                    </Link>
                    <div>
                        <GiHamburgerMenu onClick={handleClick} />
                    </div>
                </nav>
            }

        </header>
    );
};

export default Hamburger;