import Navbar from "./navbar";
import Footer from "./footer";
import useQuerySelector from "../hooks/useQuerySelector";
// import dynamic from "next/dynamic";

// const Navbar = dynamic(() => import('./navbar'), {
//     ssr: false,
// })

const Layout = ({children}) => {
    const sectionRef = useQuerySelector("section");
    
    return (
        <>
        {/* <div style={{width: "100%", padding: "80px"}}> */}
            <Navbar sectionRef={sectionRef} />
            <main className={"mainContainer"}>{children}</main>
            <Footer />
        {/* </div> */}
        </>
    )
}

export default Layout;