import Link from "next/link";
import Canvas from "../canva";
import styles from "../../styles/Footer.module.css";


const Footer = (props) => {
    return (
        <footer id="footer-elm" className={styles.footer}>

            <div className={styles.logo_link}>
                {
                    props.pageType === "No Link Tag" ?
                    <div>
                        <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={styles.footer_logo} />
                    </div> :
                    <Link href="/">
                        {/* <Canvas src="/assets/custom-haven-monkey-small.png" className={styles.footer_logo} /> */}
                        {/* <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={"logo"} /> */}
                        <Canvas src="/assets/my_logo/logo_world_customhaven_side_stack.svg" className={styles.footer_logo} />
                    </Link>
                }
            </div>

            {/* <div > */}
            <ul className={styles.footer_ul}>
                <li>
                    <h3>Contact</h3>
                    <p>10 Downing Street, UK</p>
                    <p>999</p>
                    <p>Mon-Fri 9-5</p>
                </li>
                <li>
                    <h3>About</h3>
                    <Link href="/legal/about"><p>About Us</p></Link>
                    <Link href="/legal/delivery-information"><p>Delivery Information</p></Link>
                    <Link href="/legal/privacy-policy"><p>Privacy Policy</p></Link>
                    <Link href="/legal/terms-and-conditions"><p>Terms & Conditions</p></Link>
                </li>
                <li>
                    <h3>My Account</h3>
                    <Link href="/login"><p>Sign In</p></Link>
                    <Link href="/cart"><p>View Cart</p></Link>
                    <Link href="/track-your-order"><p>Track My Order</p></Link>
                    <Link href="/wishlist"><p>Wishlist</p></Link>
                </li>
                <li>
                    <h3>FAQ</h3>
                    <Link href="/help"><p>Help</p></Link>
                </li>
            </ul>
            {/* </div> */}
            <div className={styles.footer_copyright}>
                <h4>&copy; {new Date().getFullYear()} Made with love by <Link href="https://www.github.com/CustomHaven"><span>Custom Haven</span></Link> <span>&hearts;</span></h4>
            </div>
        </footer>
    )
}

export default Footer;