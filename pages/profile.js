import Head from "next/head";
import AdminNavbar from "../components/Administrator/Navbar";
import AdminSidebar from "../components/Administrator/Sidebar";

const Profile = () => {
    return (
        <>
            <Head>
                <title>Administrator: Name</title>
            </Head>
            <div>
                <p>HELLO!</p>
                <p>HELLO!</p>
                <p>HELLO!</p>

            </div>
        </>
        
    )
}

Profile.layout = "L3";

export default Profile;