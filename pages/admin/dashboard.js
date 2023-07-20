import Head from "next/head";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../components/Administrator/Dashboard";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";

const Profile = () => {
    const dispatch = useDispatch();
    dispatch(controlAdminSideBar(0));

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