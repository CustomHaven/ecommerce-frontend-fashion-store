import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "../../styles/Navbar.module.css";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsMinecartLoaded, BsMinecart, BsFillBagFill, BsPersonX, BsPersonPlus, BsPerson, BsSearch } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import Canvas from "../canva";
import Burger from "./burger";
import useQuerySelector from "../../hooks/useQuerySelector";
import useMediaQuery from "../../hooks/useMediaQuery";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const Navbar = (props) => {
    const shopRef = useRef(null);
    const aboutRef = useRef(null);
    const headerRef = useRef(null);
    const { media } = useMediaQuery(700);
    // const sectionRef = useQuerySelector("section");
    const root = useQuerySelector(":root");

    // console.log("sectionRef", sectionRef);
    // console.log("sectionRef.current", sectionRef.current);


    const handleMouseEnter = (e) => {
        const dataSet = e.target.dataset;
        if (dataSet.hasOwnProperty("about")) {
            aboutRef.current.classList.add(styles.options_stay_on);
        } else {
            shopRef.current.classList.add(styles.options_stay_on);
        }
    }

    const handleMouseLeave = (e) => {
        const dataSet = e.target.dataset;
        if (dataSet.hasOwnProperty("about")) {
            aboutRef.current.classList.remove(styles.options_stay_on);
        } else {
            shopRef.current.classList.remove(styles.options_stay_on);
        }
    }

    const handleIntersect = entries => {
        const [entry] = entries;
        const dataSet = entry.target.dataset;
        if (!dataSet.hasOwnProperty("white")) {
            if (entry.isIntersecting) {
                headerRef.current.style.backgroundColor = "transparent";
                headerRef.current.style.boxShadow = "none";
            } else {
                headerRef.current.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
                headerRef.current.style.backgroundColor = "white";
            }
        } else {
            headerRef.current.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
            headerRef.current.style.backgroundColor = "var(--header-footer-colors)";
        }
    };
// /assets/my_logo/logo_world_customhaven_side_stack.svg #B5DECB // old #297ad6
    useIntersectionObserver({
        rootMargin: "-40%",
    }, [props.sectionRef], handleIntersect);

    useEffect(() => {
        if (!media && root.current) {
            root.current.style.setProperty("--logo-scale-size", "0.8");
        }
    }, [media]);

    return (
        <header id="header-elem" ref={headerRef} className={styles.headerNavbar}>
        
        {
            media ?

            <>
            <Burger
                logo={styles.logo}
                root={root}
                media={media}
            />
            </> :
                <>
                    <div className={styles.logo_section}>
                        <div className={styles.logo_link_section}>
                            <Link href="/" className={styles.logo_link}>
                                <div className={styles.nav_main_logo_container}>
                                    <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={"logo"} />
                                    {/* <Image 
                                        // key={img.idImage}
                                        className={styles.logo}
                                        fill src={"/assets/my_logo/logo_world_customhaven_side_stack.svg"} alt={"LOGO"}
                                    /> */}
                                </div>
                            </Link>
                        </div>
                        <div className={styles.navIcons}>
                            <Link href="/cart">
                                <BsFillBagFill />
                            </Link>
                            <Link href="/login"><BsPerson fill="white" stroke="black" strokeWidth="0.1" /></Link>
                            <Link href="/search"><BsSearch /></Link>
                            <select>
                                <option value="USD">USD</option>
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
                                <div data-shop="shop" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.dropdown_options}>
                                    <div>
                                        <Link href="/products/men/all" title="Shop for Men's"><p>Men's</p></Link>
                                        <Link href="/products/women/all" title="Shop for Women's"><p>Women's</p></Link>
                                    </div>
                                </div>
                                <p ref={shopRef} className={styles.nav_option_drawers}>
                                    <span>Shop</span>
                                    <AiOutlineDown />
                                </p>
                            </li>
                            <li>
                                <p><Link href="/services">Services</Link></p>
                            </li>
                            <li>
                                {/*  */}
                                <div className={styles.dropdown_options}>
                                    <div data-about="about" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                        <Link href="/about"><p>About Us</p></Link>
                                        <Link href="/delivery-information"><p>Delivery Information</p></Link>
                                        <Link href="/privacy-policy"><p>Privacy Policy</p></Link>
                                        <Link href="/terms-conditions"><p>Terms & Conditions</p></Link>
                                    </div>
                                </div>
                                <p ref={aboutRef} className={styles.nav_option_drawers}>
                                    <span>About</span>
                                    <AiOutlineDown />
                                </p>
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