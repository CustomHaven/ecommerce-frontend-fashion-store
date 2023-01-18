import Link from "next/link";
import { useState, useEffect } from "react";
import useQuerySelector from "../../hooks/useQuerySelector";
import useResizeObserver from "../../hooks/useResizeObserver";

const Breadcrumbs = (props) => {
    const [pageType, setPageType] = useState("");
    const navBar = useQuerySelector("#header-elem");
    const { blockSize } = useResizeObserver(navBar.current, "#header-elem");
    const breadcrumbs = props.breadcrumbs;

    const style = {
        fontSize: "min(2vw, 0.8rem)",
        color: "#808080",
        display: "inline"
    }

    const styles = {
        fontSize: "min(2vw, 0.8rem)",
        color: "green",
        display: "inline"
    }

    useEffect(() => {
        if (props.pageType === "productPage") {
            const gender = breadcrumbs[1].replace(/^(\w+).\w\s(\w+)$/, "$1/$2").toLowerCase();
    
            setPageType("/products" + "/" + gender);
        } else {
            setPageType("");
        }
    }, [])

    return (
        <>
            <div style={{ 
                height: `${blockSize / props.divideBy}px`, 
                // marginLeft: props.pageType !== "cartPage" ? "50px" : "0px",
                margin: props.pageType === "cartPage" ? "40px 10%" : "0px 0px 0px 50px"
            }}>
                {
                    breadcrumbs.map((crumb, index, array) => {
                        //<> 
                        

                        if (crumb !== array[array.length - 1]) {
                            return (
                                <div style={style} key={index}>
                                    <Link href={index === 0 ? "/" : pageType !== "" ? pageType : "/" + crumb}>
                                        {crumb}
                                    </Link>
                                    <span> &gt; </span>
                                </div>
                                )
                        } else {
                            return <Link style={styles} key={index} href={"/" + crumb}>{crumb}</Link>
                        }

                    })
                }
            </div>
        </>
    );
}

export default Breadcrumbs;