import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus, AiOutlineInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { TfiFacebook, TfiTwitterAlt } from "react-icons/tfi";
import styles from "../../../../styles/Menu.module.css";
import Canvas from "../../../canva";

const Menu = (props) => {

    const [shop, setShop] = useState(false);
    const [about, setAbout] = useState(false);

    // Sidebar with two classes
    const asideTopClasses = [styles.sidebar_menu_drawer, styles.aside_menu_drawer].join(" ");
    const sidebarMenuRef = useRef(null);

    const closeSideBar = () => {
        sidebarMenuRef.current.classList.remove(styles.sidebar_slide_in_right);
        sidebarMenuRef.current.classList.add(styles.sidebar_slide_out_right);
        setTimeout(props.setMenuClick, 300, false);
    }

    const handleClick = (e) => {
        const dataSet = e.target.dataset;
        if (dataSet.hasOwnProperty("shop")) {
            setShop(!shop);
        } else { // other wise hasOwnProperty is "about"
            setAbout(!about);
        }
    }

    useEffect(() => {
        if (props.media && props.root.current && props.menuClick) {
            props.root.current.style.setProperty("--logo-scale-size", "1");
        }
    }, [props.media, props.menuClick]);

    return (
        <>
            {
                <aside ref={sidebarMenuRef} id="sidebar-menu" className={asideTopClasses}>
                    <button onClick={closeSideBar}>
                        <AiOutlineClose />
                    </button>
                    <figure className={styles.aside_menu_canva_logo_container}>
                        <Link href="/" onClick={closeSideBar}>
                            {/* <Canvas src="/assets/custom-haven-monkey-small.png" className={styles.aside_menu_canva_logo} /> */}
                            <Canvas 
                                src="/assets/my_logo/logo_world_customhaven_side_stack.svg"
                                // className={"logo"}
                                className={[styles.aside_menu_canva_logo, "logo"].join(" ")}
                            />
                        </Link>
                    </figure>
                    <ul className={styles.aside_menu_ul}>
                        <li>
                            <Link href="/" onClick={closeSideBar}><span>Home</span></Link>
                        </li>
                        <li data-shop="shop-li" onClick={handleClick}>
                            <span data-shop="shop-li" data-span-content="the-content">Shop</span>
                            {
                                shop === false &&
                                <AiOutlinePlus data-shop="shop-li" data-span-plus="the-plus" />
                            }
                            {
                                shop === true &&
                                <>
                                <AiOutlineMinus data-shop="shop-li" data-span-plus="the-minus" />
                                <div className={styles.aside_menu_options_dropdown}>
                                    <ul>
                                        <li>
                                            <Link href="/products/men/all" onClick={closeSideBar}><p>Men's</p></Link>
                                        </li>
                                        <li>
                                            <Link href="/products/women/all" onClick={closeSideBar}><p>Women's</p></Link>
                                        </li>
                                    </ul>
                                </div>
                                </>
                            }
                        </li>
                        <li>
                            <Link href="/services"><span>Services</span></Link>
                        </li>
                        <li data-about="about-li" onClick={handleClick}>
                            <span data-about="about-li" data-span-content="the-content">About</span>
                            {
                                about === false &&
                                <AiOutlinePlus data-about="about-li" data-span-plus="the-plus" />
                            }
                            {
                                about === true &&
                                <>
                                <AiOutlineMinus data-about="about-li" data-span-plus="the-minus" />
                                <div className={styles.aside_menu_options_dropdown}>
                                    <ul>
                                        <li>
                                            <Link href="/about" onClick={closeSideBar}><p>About Us</p></Link>
                                        </li>
                                        <li>
                                            <Link href="/delivery-information" onClick={closeSideBar}><p>Delivery Information</p></Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy" onClick={closeSideBar}><p>Privacy Policy</p></Link>
                                        </li>
                                        <li>
                                            <Link href="/terms-conditions" onClick={closeSideBar}><p>Terms & Conditions</p></Link>
                                        </li>
                                    </ul>
                                </div>
                                </>
                            }
                        </li>
                        <li>
                            <Link href="/contact"><span>Contact</span></Link>
                        </li>
                    </ul>
                    <p className={styles.aside_menu_account}><Link href="/login" onClick={closeSideBar}>Account</Link></p>
                    <nav className={styles.aside_menu_last_nav}>
                        <div>
                            <select>
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                            </select>
                            <ul className={styles.socials}>
                                <li><TfiFacebook /></li>
                                <li><TfiTwitterAlt /></li>
                                <li><AiOutlineInstagram /></li>
                                <li><AiFillYoutube /></li>
                                <li><Link href="https://github.com/CustomHaven"><AiFillGithub /></Link></li>
                            </ul>
                        </div>
                    </nav>
                </aside>
            }
        </>
    );
};

export default Menu;