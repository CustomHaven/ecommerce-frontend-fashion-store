import Link from "next/link";
import { useState, useEffect } from "react";
import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";

const Breadcrumbs = (props) => {
    const [pageType, setPageType] = useState([]);
    const [pathname, setPathName] = useState("");
    const navBar = useQuerySelector("#header-elem");
    const { blockSize } = useResizeObserver(navBar.current, "#header-elem");
    const breadcrumbs = props.breadcrumbs;
    //breadcrumb array! (3) ['Home', "Men's Top", 'Camping Jacket']

    console.log();

    const style = {
        fontSize: "min(2vw, 0.8rem)",
        color: "#808080",
        display: "inline"
    }

    const styles = {
        fontSize: "min(2vw, 0.8rem)",
        color: "var(--logo-color)",
        display: "inline"
    }

    useEffect(() => {
        if (process.title === "browser") {
            const uri = window.location.pathname;
            setPathName(uri);
        }
        if (props.pageType === "productPage") {
            const gender = ["/", breadcrumbs[1].replace(/^(\w+).\w\s(\w+)$/, "/products/$1/$2").toLowerCase()];
            setPageType(gender);

        } else if (props.pageType === "cartPage") {
            const productsAll = ["/", breadcrumbs[1].replace(/^(\w+)\s(\w+)$/, "/$2/$1").toLowerCase()];
            setPageType(productsAll);
        } else {
            setPageType("");
        }
    }, [props.pageType]);

    return (
        <>
            <div style={{ 
                height: `${blockSize / props.divideBy}px`, 
                // marginLeft: props.pageType !== "cartPage" ? "50px" : "0px",
                margin: props.pageType === "checkoutPage" ? "20px 0" : props.pageType === "cartPage" ? "40px 10%" : "0px 0px 0px 50px"
            }}>
                {
                    pageType !== undefined || pageType !== null ?
                    breadcrumbs.map((crumb, index, array) => {
                        if (crumb !== array[array.length - 1]) {
                            return (
                                <div style={style} key={index}>
                                    <Link href={index === 0 ? "/" : pageType[index] !== undefined ? pageType[index] : "/"}>
                                        {crumb}
                                    </Link>
                                    <span> &gt; </span>
                                </div>
                                )
                        } else {
                            return <Link 
                                        style={styles} 
                                        key={index} 
                                        href={props.prodId !== "" ? pathname : "/" + crumb.toLowerCase()}>{crumb}</Link>
                        }

                    }) : null
                }
            </div>
        </>
    );
}

export default Breadcrumbs;