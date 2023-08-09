import Head from "next/head";
import { useDispatch } from "react-redux";
import AdminCustomers from "../../components/Administrator/Customers";
import { loginPerson } from "../../feature/authSlice/authSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { wrapper } from "../../store/store";
import { fetchMethod, headers } from "../../utils/generalUtils";

const Customers = (props) => {
    const dispatch = useDispatch();
    dispatch(controlAdminSideBar(3));
    return (
        <>
            <Head>
                <title>Admin Customers</title>
            </Head>
            <AdminCustomers />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        // /
        if (Object.keys(store.getState().auth?.loginProfile).length === 0) {
            await fetchMethod(`${process.env.FRONTEND}/api/refresh`, "POST", headers, {
            // await fetchMethod("https://custom-haven-ecommerce.vercel.app/api/refresh", "POST", headers, {
                refresh_token: context.req.cookies.refresh_token
            }, true).then(res => { 
                store.dispatch(loginPerson(res)); 
            }).catch(err => store.dispatch(loginPerson(res)));
        }

        const user = store.getState().auth.loginProfile;
        console.log("CONTEXT.req.cookies.refresh_token", context.req.cookies.refresh_token);
        if (!user.token) {
            console.log("OKAY WE ARE HERE?!");
            console.log(store.getState().auth);
            console.log("USER VALUES?");
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
        if (user?.user?.role !== "Administrator") {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        return {
            props: {
                customers: "done 4 now!"
            }
        }
    }
);

Customers.layout = "L3";

export default Customers;