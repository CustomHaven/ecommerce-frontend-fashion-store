import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Canvas from "../../canva";
import styles from "../../../styles/Burger.module.css";
import Menu from "./menu";

const Burger = (props) => {

    const [menuClick, setMenuClick] = useState(false);
    const handleClick = () => {
        setMenuClick(true);
    }

    return (
        <>
            {
                process?.title === "browser" && menuClick === true ?
                <>
                    <Menu
                        menuClick={menuClick}
                        setMenuClick={() => setMenuClick()}
                    />

                </> :
                <nav className={styles.burger_nav}>
                    <Link href="/" className={styles.logo_link}>
                        <Canvas 
                            src="/assets/custom-haven-monkey-small.png" 
                            className={props.logo} 
                        />
                    </Link>
                    <div>
                        <GiHamburgerMenu onClick={handleClick} />
                    </div>
                </nav>
            }
        </>
    );
};

export default Burger;