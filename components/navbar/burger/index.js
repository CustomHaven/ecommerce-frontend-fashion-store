import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Canvas from "../../canva";
import styles from "../../../styles/Burger.module.css";
import Menu from "./menu";

const Burger = (props) => {

    // root.current.style.setProperty("--logo-scale-size", "1");
    const [menuClick, setMenuClick] = useState(false);
    const handleClick = () => {
        setMenuClick(true);
    }

    useEffect(() => {
        if (props.media && props.root.current && !menuClick) {
            props.root.current.style.setProperty("--logo-scale-size", "1.5");
        }
    }, [props.media, menuClick]);

    // console.log("rooot burger", root);

    return (
        <>
            {
                process?.title === "browser" && menuClick === true ?
                <>
                    <Menu
                        menuClick={menuClick}
                        setMenuClick={() => setMenuClick()}
                        root={props.root}
                        media={props.media}
                    />

                </> :
                <nav className={styles.burger_nav}>
                    <Link href="/" className={styles.logo_link}>
                        <Canvas 
                            src="/assets/my_logo/logo_world_customhaven_side_stack.svg"
                            className={"logo"} 
                        />
                        {/* <div className={styles.logo_link_div}>
                            <Image 
                                // key={img.idImage}
                                className={"logo"}
                                fill src={"/assets/my_logo/logo_world_customhaven_side_stack.svg"} alt={"LOGO"}
                            />
                        </div> */}
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