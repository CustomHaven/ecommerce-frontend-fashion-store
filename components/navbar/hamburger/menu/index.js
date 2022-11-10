import React, { useState } from "react";
import Link from "next/link";
import { BsMinecartLoaded, BsMinecart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineDown } from "react-icons/ai";
import styles from "../../../../styles/Menu.module.css";
import Canvas from "../../../canva";


const Menu = (props) => {

    const [shop, setShop] = useState(false);
    const [about, setAbout] = useState(false);


    const shopClicked = () => {
        setShop(!shop);
    };
    const aboutClick = () => {
        setAbout(!about);
    };

    return (
        <div className={styles.menu_container}>
            <ul className={styles.ulNavs_menu}>
                <li>
                    <div className={styles.navIcons_menu}>
                        <Link href="/cart"><BsMinecart /></Link>
                        <Link href="/login"><CgProfile /></Link>
                    </div>
                </li>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div className={styles.menu_options_container}>
                        <span onClick={shopClicked}>Shop</span>
                        <AiOutlineDown onClick={shopClicked} />
                        {
                            shop === true &&
                            <div className={styles.menu_options_shop}>
                                <Link href="/shop/mens"><p>Men's</p></Link>
                                <Link href="/shop/womens"><p>Women's</p></Link>
                            </div>
                        }

                    </div>
                </li>
                <li>
                    <Link href="/services">Services</Link>
                </li>
                <li style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div className={styles.menu_options_container}>
                        <span onClick={aboutClick}>About</span>
                        <AiOutlineDown onClick={aboutClick} />
                        {
                            about === true ?
                            <div className={styles.menu_options_about}>
                                <Link href="/about"><p>About Us</p></Link>
                                <Link href="/delivery-information"><p>Delivery Information</p></Link>
                                <Link href="/privacy-policy"><p>Privacy Policy</p></Link>
                                <Link href="/terms-conditions"><p>Terms & Conditions</p></Link>
                            </div> : null
                        }
                    </div>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
            {
                props.menuClick === true &&
                <Canvas src="/assets/Custom.png" width={550} height={210} className={styles.menu_logo} />
            }
        </div>
    );
};

export default Menu;