import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; 
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Canvas from "../../canva";
import styles from "../../../styles/Aside.module.css";
// import { useRouter } from "next/dist/client/router";

const AsideMenu = () => {
    // Stops some error
    if (process.title === "browser" && window.location.pathname === "/") {
        console.log("empty pathname?");
        return;
    }
    // const router = useRouter();

    // console.log("router inside asideMenu", router.query);
    // console.log(window.location.pathname);

    const [menClick, setMenClick] = useState(false);
    const [womenClick, setWomenClick] = useState(false);
    const menRef = useRef(null);
    const womenRef = useRef(null);

    const allProduct = useRef(null);
    const allMen = useRef(null);
    const menTop = useRef(null);
    const menBottom = useRef(null);
    const allWomen = useRef(null);
    const womenTop = useRef(null);
    const womenBottom = useRef(null);

    const pageArrayRefs = [ allProduct, allMen, menTop, menBottom, allWomen, womenTop, womenBottom ];
    const pageParamList = [
        "/products/all",
        "/products/men/all",
        "/products/men/top",
        "/products/men/bottom",
        "/products/women/all",
        "/products/women/top",
        "/products/women/bottom"
    ];

    const [pageList] = useState(pageParamList.indexOf(process?.title === "browser" && window.location.pathname));


    // https://freefrontend.com/css-sidebar-menus/ implement their example!
    const { windowWidth } = useWindowDimensions();


    const asideMenuContainer = [styles.aside_menu_container, windowWidth > 500 && styles.aside_menu_container_underscore_after].join(" ");

    const handleDropDownMen = () => {
        if (!(pageList >= 1 && pageList <= 3)) {
            setMenClick(!menClick);
            if (menClick === true) {
                if (menRef.current !== null) {
                    menRef.current.classList.add(styles.aside_menu_dropdown);
                    menRef.current.classList.remove(styles.aside_menu_dropdown_remove);
                }
            } else {
                if (menRef.current !== null) {
                    menRef.current.classList.remove(styles.aside_menu_dropdown);
                    menRef.current.classList.add(styles.aside_menu_dropdown_remove);
                }
            }
        } else {
            setMenClick(false);
        }
    }

    const handleDropDownWomen = () => {
        if (!(pageList >= 4 && pageList <= 6)) {
            setWomenClick(!womenClick);
            if (womenClick === true) {
                if (womenRef.current !== null) {
                    womenRef.current.classList.add(styles.aside_menu_dropdown);
                    womenRef.current.classList.remove(styles.aside_menu_dropdown_remove);
                }
            } else {
                if (womenRef.current !== null) {
                    womenRef.current.classList.remove(styles.aside_menu_dropdown);
                    womenRef.current.classList.add(styles.aside_menu_dropdown_remove);
                }
            }
        } else {
            setWomenClick(false);
        }
    }

    const handleOnLoad = () => {
        // stops some error that pageArrayRefs[pathNameIndex].current is null when pathname is nothing
        if (process.title === "browser" && window.location.pathname === "/") {
            console.log("empty pathname?");
            return;
        }
        // Reason for this is when single product page comes up I dont want this part of the code to follow along so I return and break out
        const slashArrays = window.location.pathname.match(/[\/]/g);
        if (slashArrays.length === 4) {
            return;
        }
        if (windowWidth <= 500) {
            return pageArrayRefs.forEach(page => {
                if (page.current !== null) {
                    page.current.classList.remove(styles.aside_underscore_page);
                }
            });
        }
        const pathNameIndex = pageParamList.indexOf(window.location.pathname);
        if (pageArrayRefs[pathNameIndex].current !== null) {
            pageArrayRefs.forEach(page => {
                if (page.current !== null) {
                    page.current.classList.remove(styles.aside_underscore_page);
                }
            });
            pageArrayRefs[pathNameIndex].current.classList.add(styles.aside_underscore_page);
        }


    }
    
    useEffect(() => {
        if (process.title === "browser" && window.location.pathname === "/") {
            console.log("empty pathname?");
            return;
        }
        if (document.readyState !== "loading") {
            handleOnLoad();
        }
        window.addEventListener("resize", handleOnLoad);
        window.addEventListener("change", handleOnLoad);

    }, [process?.title === "browser" && window.location.pathname, pageList]);

    return (
        <>
            <aside id="aside_product_menu_id" className={styles.aside_product_menu}>
                <div>
                    <Link href="/">
                        {
                            windowWidth <= 500 ?
                            <p className={styles.aside_logo_click}>Home</p> :
                            <Canvas src="/assets/custom-haven-monkey-small.png" className={styles.aside_logo_click} />
                        }
                    </Link>
                </div>
                <ul className={styles.aside_navs_grid}>
                    <li>
                        <div>
                            <Link href="/products/all"><span ref={allProduct}>All Products</span></Link>
                        </div>
                    </li>


                    <li className={asideMenuContainer}>
                        <div onClick={handleDropDownMen} className={styles.aside_menu_holder}>
                            <p>Men</p>
                            { menClick
                            ? <AiOutlineMinus className={styles.aside_menu_opener_closer} />
                            : <AiOutlinePlus className={styles.aside_menu_opener_closer} />
                            }
                        </div>
                        { menClick || (pageList >= 1 && pageList <= 3) ? 
                        <ul ref={menRef} className={styles.aside_menu_dropdown}>
                            <li><Link href="/products/men/all"><span ref={allMen}>All</span></Link></li>
                            <li><Link href="/products/men/top"><span ref={menTop}>Top's</span></Link></li>
                            <li><Link href="/products/men/bottom"><span ref={menBottom}>Bottom's</span></Link></li>
                        </ul>
                        : null}
                    </li>


                    <li className={asideMenuContainer}>
                        <div onClick={handleDropDownWomen} className={styles.aside_menu_holder}>
                            <p>Women</p>
                            { womenClick
                            ? <AiOutlineMinus className={styles.aside_menu_opener_closer} />
                            : <AiOutlinePlus className={styles.aside_menu_opener_closer} />
                            }
                        </div>
                        { womenClick || (pageList >= 4 && pageList <= 6) ? 
                        <ul ref={womenRef} className={styles.aside_menu_dropdown}>
                            <li><Link href="/products/women/all"><span ref={allWomen}>All</span></Link></li>
                            <li><Link href="/products/women/top"><span ref={womenTop}>Top's</span></Link></li>
                            <li><Link href="/products/women/bottom"><span ref={womenBottom}>Bottom's</span></Link></li>
                        </ul>
                        : null}
                    </li>
                </ul>


                <div className={styles.aside_account_holder}>
                    <Link href="/login">
                        <BsPerson className={styles.aside_account_icon} fill="#171C2B" stroke="#171C2B" strokeWidth="0.1" />
                        <p>Account</p>
                    </Link>
                </div>
            </aside>
        </>
    )
}


export default AsideMenu;