import Head from "next/head";
import AdminNavbar from "../../../components/Administrator/Navbar";
import AdminSidebar from "../../../components/Administrator/Sidebar";
import AdminDashboard from "../../../components/Administrator/Dashboard";

const Profile = () => {
    return (
        <>
            <Head>
                <title>pro</title>
            </Head>
            <AdminDashboard />
        </>
    )
}

Profile.layout = "L3";

export default Profile;