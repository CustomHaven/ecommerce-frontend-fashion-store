import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AdminCustomers from "../../components/Administrator/Customers";
import { selectLoginProfile } from "../../feature/authSlice/authSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";

const Customers = () => {
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
    dispatch(controlAdminSideBar(3));
    return (
        <>
            <Head>
                <title>Customers</title>
            </Head>
            {
                user?.user?.role === "Administrator" &&
                <AdminCustomers />
            }
        </>
    )
}

Customers.layout = "L3";

export default Customers;