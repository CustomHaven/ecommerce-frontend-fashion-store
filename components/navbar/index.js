import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { BsMinecartLoaded, BsMinecart, BsFillBagFill } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsPersonX, BsPersonPlus, BsPerson, BsSearch } from "react-icons/bs";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import Canvas from "../canva";
import { selectNavHeader, selectHeroRef, placeHeaderRef } from "../../feature/generalComponents/generalComponentSlice";
import Hamburger from "./hamburger";
import { mediaQueryFunc } from "../../utils/mediaQuery";
import YourSvg from '/public/assets/Black-_-White-Minimalist-Business-Logo.svg';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useMediaQuery from "../../hooks/useMediaQuery";

const Navbar = () => {

    const headerRef = useRef(null);
    const { windowWidth } = useWindowDimensions();
    const { media } = useMediaQuery(700);
    const [heightCanva] = useState(180);

    return (
        <header id="header-elem" ref={headerRef} className={styles.headerNavbar}>
        
        {
            media ?

            <>
            <Hamburger
                navStyles={styles}
                logoLink={styles.logo_link}
                logo={styles.logo}
                headerNavbar={styles.headerNavbar}
                windowWidth={windowWidth}
                heightCanva={heightCanva}
                // setWindowWidth={() => setWindowWidth}
            />
            </> :
                <>
            {/* // <header id="header-elem" ref={headerRef} className={styles.headerNavbar}> */}
                <div className={styles.logo_section}>
                    <div className={styles.logo_link_section}>
                        <Link href="/" className={styles.logo_link}>
                            <Canvas src="/assets/custom-haven-monkey-small.png" width={250} height={heightCanva} className={styles.logo} />
                        </Link>
                    </div>
                    <div className={styles.navIcons}>
                        <Link href="/cart">
                            <BsFillBagFill />
                        </Link>
                        <Link href="/login"><BsPerson fill="white" stroke="black" strokeWidth="0.1" /></Link>
                        <Link href="/search"><BsSearch /></Link>
                        <select>
                            <option value="USD">{windowWidth < 1300 ? "USD" : "SHILING"}</option>
                            <option value="GBP">GBP</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>
                <nav className={styles.navigations}>
                    <ul className={styles.ulNavs}>
                        <li>
                            <p><Link href="/"><span>Home</span></Link></p>
                        </li>
                        <li>
                            <p><span>Shop</span></p>
                            <AiOutlineDown />
                            <div className={styles.dropdown_options}>
                                <div>
                                    <Link href="/shop/mens"><p>Men's</p></Link>
                                    <Link href="/shop/womens"><p>Women's</p></Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <p><Link href="/services">Services</Link></p>
                        </li>
                        <li>
                            <p><span>About</span></p>
                            <AiOutlineDown />
                            <div id="about" className={styles.dropdown_options}>
                                <div>
                                    <Link href="/about"><p>About Us</p></Link>
                                    <Link href="/delivery-information"><p>Delivery Information</p></Link>
                                    <Link href="/privacy-policy"><p>Privacy Policy</p></Link>
                                    <Link href="/terms-conditions"><p>Terms & Conditions</p></Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <p><Link href="/contact"><span>Contact</span></Link></p>
                        </li>
                    </ul>
                </nav>
                </>
            
        }
        </header>
    );
};

export default Navbar;