import Head from "next/head";
import { useDispatch } from "react-redux";
import AdminCustomers from "../../components/Administrator/Customers";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";

const Customers = () => {
    const dispatch = useDispatch();
    dispatch(controlAdminSideBar(3));
    return (
        <>
            <Head>
                <title>Customers</title>
            </Head>
            <AdminCustomers />
        </>
    )
}

Customers.layout = "L3";

export default Customers;