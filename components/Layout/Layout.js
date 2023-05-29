import Navbar from "../navbar";
import Footer from "../footer";
import useQuerySelector from "../../hooks/useQuerySelector";
// import dynamic from "next/dynamic";

// const Navbar = dynamic(() => import('./navbar'), {
//     ssr: false,
// })

const Layout = (props) => {
    const sectionRef = useQuerySelector("section");


    // const thePath = props.props.router.state?.pathname;
    // console.log("LAYOUT LEVEL HAVE WE GOT PROPS?", props);

    // console.log("thePATH?", thePath);
    // console.log("pathNAME??", window.location.pathname);
    return (
        <>
            <Navbar sectionRef={sectionRef} />
            <main className={"mainContainer"}>{props.children}</main>
            <Footer />

        </>
    )
}

export default Layout;