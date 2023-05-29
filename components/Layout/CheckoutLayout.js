import Navbar from "../navbar";
import Footer from "../footer";
import { useState, useEffect, useRef } from "react";
import useQuerySelector from "../../hooks/useQuerySelector";
// import dynamic from "next/dynamic";

// const Navbar = dynamic(() => import('./navbar'), {
//     ssr: false,
// })

const CheckoutLayout = (props) => {



    // console.log("thePATH?", thePath);
    // // console.log("pathNAME??", window.location.pathname);
    // const [hydrate, setHydrate] = useState(false);

    // useEffect(() => {
    //     setHydrate(true);
    // }, []);


    return (
            <main style={{ backgroundColor: "white", }} className={"mainContainer"}>{props.children}</main>
    )
}

export default CheckoutLayout;