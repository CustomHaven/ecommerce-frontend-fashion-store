import Head from "next/head";
import AdminProductListing from "../../../components/Administrator/ProductListing";
import { useDispatch } from "react-redux";
import { controlAdminSideBar } from "../../../feature/generalComponents/generalComponentSlice";

const Profile = () => {
    const dispatch = useDispatch();
    dispatch(controlAdminSideBar(2));
    return (
        <>
            <Head>
                <title>PRODCUTS</title>
            </Head>
            <AdminProductListing />
        </>
    )
}

Profile.layout = "L3";

export default Profile;