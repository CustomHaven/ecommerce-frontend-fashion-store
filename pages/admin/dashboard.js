import Head from "next/head";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../components/Administrator/Dashboard";
import { loginPerson } from "../../feature/authSlice/authSlice";
import { retrieveAllOrderThunk } from "../../feature/orderSlice/orderSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { wrapper } from "../../store/store";
import { fetchMethod, headers } from "../../utils/generalUtils";

const Dashboard = (props) => {
    const dispatch = useDispatch();

    dispatch(controlAdminSideBar(0));

    return (
        <>
            <Head>
                <title>Administrator: Name</title>
            </Head>
            {
                // user?.user?.role === "Administrator" &&
                <AdminDashboard 
                    allOrders={props.allOrders}
                />
            }
        </>
    )
}

/*

Error: 
  x You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps

*/

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        // /
        if (Object.keys(store.getState().auth?.loginProfile).length === 0) {
            // await fetchMethod("http://localhost:3000/api/refresh", "POST", headers, {
            await fetchMethod("https://custom-haven-ecommerce.vercel.app/api/refresh", "POST", headers, {
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

        console.log("context.req.cookies.refresh_token", context.req.cookies);

        await store.dispatch(retrieveAllOrderThunk({refreshed_token: context.req.cookies.refreshed_token}));

        return {
            props: {
                allOrders: store.getState().order.allOrders
            }
        }
    }
);


Dashboard.layout = "L3";

export default Dashboard;