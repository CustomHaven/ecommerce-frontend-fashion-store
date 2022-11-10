import { useSelector } from "react-redux";
import Navbar from "./navbar";
import Footer from "./footer";
import { selectMainMarginTop } from "../feature/generalComponents/generalComponentSlice";
// import dynamic from "next/dynamic";

// const Navbar = dynamic(() => import('./navbar'), {
//     ssr: false,
// })

const Layout = ({children}) => {
    const mainMarginTop = useSelector(selectMainMarginTop);
    
    return (
        <>
        {/* <div style={{width: "100%", padding: "80px"}}> */}
            <Navbar />
                <main className={"mainContainer"} style={{marginTop: mainMarginTop}}>{children}</main>
            <Footer />
        {/* </div> */}
        </>
    )
}

export default Layout;