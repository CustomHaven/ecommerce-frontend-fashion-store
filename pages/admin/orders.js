import Head from "next/head";
import { useDispatch } from "react-redux";
import AdminOrders from "../../components/Administrator/Orders";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";

const Orders = () => {
    const dispatch = useDispatch();
    dispatch(controlAdminSideBar(1));
    return (
        <>
            <Head>
                <title>Customer Orders</title>
            </Head>
            <AdminOrders />
        </>
    )
}

Orders.layout = "L3";

export default Orders;