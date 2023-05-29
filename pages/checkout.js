import Head from "next/head";
import { redirect } from 'next/navigation';
import CheckoutPage from "../components/checkout";
import { useSelector } from "react-redux";
import { selectCart } from "../feature/cartSlice/cartSlice";

const Checkout = () => {
    const cart = useSelector(selectCart);

    if (cart.id === undefined) {
        redirect("/");
    }
    return (
        <>
            <Head>
                <title>Haven Checkout Page</title>
            </Head>
            <CheckoutPage />
        </>
    )
};

Checkout.layout = "L2";

export default Checkout;