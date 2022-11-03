import Link from "next/link";
import Canvas from "../canva";
// import "../../styles/Navbar.module.css";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo_link}>
                <Link href="/">
                    <Canvas src="/assets/Custom.png" width={250} height={110} className={styles.footer_logo} />
                </Link>
            </div>
            <ul className={styles.footer_ul}>
                <li>
                    <h3>Contact</h3>
                    <p>Address: 10 Downing Street, London, UK</p>
                    <p>Phone: 999</p>
                    <p>Hours: Mon-Fri 9-5</p>
                </li>
                <li>
                    <h3>About</h3>
                    <Link href="/about"><p>About Us</p></Link>
                    <Link href="/delivery-information"><p>Delivery Information</p></Link>
                    <Link href="/privacy-policy"><p>Privacy Policy</p></Link>
                    <Link href="/terms-conditions"><p>Terms & Conditions</p></Link>
                </li>
                <li>
                    <h3>My Account</h3>
                    <Link href="/register"><p>Sign In</p></Link>
                    <Link href="/cart"><p>View Cart</p></Link>
                    <Link href="/user_id/track-the-order"><p>Track My Order</p></Link>
                    <Link href="/wishlist"><p>Wishlist</p></Link>
                </li>
                <li>
                    <h3>FAQ</h3>
                    <Link href="/help"><p>Help</p></Link>
                </li>
            </ul>
            <h4>&copy; {new Date().getFullYear()} Made with love by Custom Haven <span>&hearts;</span></h4>
        </footer>
    )
}

export default Footer;