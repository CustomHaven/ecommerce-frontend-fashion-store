import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { BsMinecartLoaded, BsMinecart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineDown } from "react-icons/ai";
import Canvas from "../canva";

const Navbar = () => {
    return (
        <header className={styles.headerNavbar}>
            <Link href="/" className={styles.logo_link}>
                <Canvas src="/assets/Custom.png" width={250} height={110} className={styles.logo} />
            </Link>
            <nav className={styles.navigations}>
                <ul className={styles.ulNavs}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Link href="/shop">Shop</Link>
                        <AiOutlineDown style={{marginTop: "4px", paddingLeft: "5px"}}/>
                    </li>
                    <li>
                        <Link href="/services">Services</Link>
                    </li>
                    <li style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Link href="/about">About</Link>
                        <AiOutlineDown style={{marginTop: "4px", paddingLeft: "5px"}}/>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
                <div className={styles.navIcons}>
                    <BsMinecart />
                    <CgProfile />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;