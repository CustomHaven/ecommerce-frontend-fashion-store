import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AdminOrders from "../../components/Administrator/Orders";
import { selectLoginProfile } from "../../feature/authSlice/authSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";

const Orders = () => {
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


    dispatch(controlAdminSideBar(1));
    return (
        <>
            <Head>
                <title>Customer Orders</title>
            </Head>
            {
                user?.user?.role === "Administrator" && 
                <AdminOrders />
            }
        </>
    )
}

Orders.layout = "L3";

export default Orders;