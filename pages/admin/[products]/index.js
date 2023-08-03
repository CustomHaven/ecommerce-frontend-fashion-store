import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AdminProductListing from "../../../components/Administrator/ProductListing";
import { selectLoginProfile } from "../../../feature/authSlice/authSlice";
import { controlAdminSideBar } from "../../../feature/generalComponents/generalComponentSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoginProfile);
    const router = useRouter();

    if (process.title === "browser") {
        if (user.token) {
            if (user.user.role !== "Administrator") {
                // redirect to user page or homepage
                // redirect("/");
                router.push("/");
    
            }
        } else {
            // redirect to login page
            // redirect("/login");
            router.push("/login");
            
        }
    }
    dispatch(controlAdminSideBar(2));
    return (
        <>
            <Head>
                <title>PRODCUTS</title>
            </Head>
            {
                user?.user?.role === "Administrator" &&
                <AdminProductListing />
            }
        </>
    )
}

Profile.layout = "L3";

export default Profile;