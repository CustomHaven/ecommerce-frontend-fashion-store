import Head from "next/head";
import AdminProductListing from "../../../components/Administrator/ProductListing";

const Profile = () => {
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