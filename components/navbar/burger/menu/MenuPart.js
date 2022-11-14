import React, { useState, useRef } from "react";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import styles from "../../../../styles/MenuPart.module.css";
import Canvas from "../../../canva";
import { TfiFacebook, TfiTwitterAlt } from "react-icons/tfi";
import { AiOutlineInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";

const MenuPart = (props) => {

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

    return (
        <>
        {
        <aside ref={sidebarMenuRef} id="sidebar-menu" className={asideTopClasses}>
            <button onClick={closeSideBar}>
                <AiOutlineClose />
            </button>
            <figure className={styles.aside_menu_canva_logo_container}>
                <Canvas src="/assets/custom-haven-monkey-small.png" className={styles.aside_menu_canva_logo} />
            </figure>
            <ul className={styles.aside_menu_ul}>
                <li>
                    <Link href="/"><span>Home</span></Link>
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
                                    <Link href="/shop/mens"><p>Men's</p></Link>
                                </li>
                                <li>
                                    <Link href="/shop/womens"><p>Women's</p></Link>
                                </li>
                            </ul>
                        </div>
                        </>
                    }
                </li>
                <li>
                    <Link href="services"><span>Services</span></Link>
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
                                    <Link href="/about"><p>About Us</p></Link>
                                </li>
                                <li>
                                    <Link href="/delivery-information"><p>Delivery Information</p></Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy"><p>Privacy Policy</p></Link>
                                </li>
                                <li>
                                    <Link href="/terms-conditions"><p>Terms & Conditions</p></Link>
                                </li>
                            </ul>
                        </div>
                        </>
                    }
                </li>
                <li>
                    <Link href="contact"><span>Contact</span></Link>
                </li>
            </ul>
            <p className={styles.aside_menu_account}>Account</p>
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

export default MenuPart;


// TfiFacebook
// TfiTwitterAlt
// AiOutlineInstagram
// AiFillYoutube
// AiFillGithub