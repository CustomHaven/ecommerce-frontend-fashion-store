import AdminNavbar from "../Administrator/Navbar";
import AdminSidebar from "../Administrator/Sidebar";
import Footer from "../footer";
// import dynamic from "next/dynamic";

// const Navbar = dynamic(() => import('./navbar'), {
//     ssr: false,
// })

const AdminLayout = (props) => {
    // const thePath = props.props.router.state?.pathname;
    // console.log("LAYOUT LEVEL HAVE WE GOT PROPS?", props);

    // console.log("thePATH?", thePath);
    // console.log("pathNAME??", window.location.pathname);
    return (
        <>
            <AdminNavbar />
            <main className={"adminMainContainer"}>
                <AdminSidebar />
                {props.children}
            </main>
            <Footer 
                pageType={"No Link Tag"}
            />

        </>
    )
}

export default AdminLayout;