import Head from "next/head";
import AdminDashboard from "../../components/Administrator/Dashboard";

const Profile = () => {
    return (
        <>
            <Head>
                <title>Administrator: Name</title>
            </Head>
            <AdminDashboard />
        </>
    )
}

Profile.layout = "L3";

export default Profile;