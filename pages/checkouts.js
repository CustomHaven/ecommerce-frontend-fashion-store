import Head from "next/head";
import CheckoutPage from "../components/checkoutPage";

const Checkouts = () => {
    // const cart = useSelector(selectCart);
    
    // if (cart.id === undefined) {
    //     console.log("WE ARE RETURNING!")
    //     redirect("/");
    // }
    return (
        <>
            <Head>
                <title>Haven Checkout Page</title>
            </Head>
            <CheckoutPage />
        </>
    )
};

Checkouts.layout = "L2";

export default Checkouts;