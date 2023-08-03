import Head from "next/head";
import { redirect } from "next/navigation";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../../components/Administrator/Dashboard";
import { selectLoginProfile, loginPerson } from "../../feature/authSlice/authSlice";
import { retrieveAllOrderThunk, selectAllOrders } from "../../feature/orderSlice/orderSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { wrapper } from "../../store/store";
import { fetchMethod, headers } from "../../utils/generalUtils";

const Dashboard = (props) => {
    const dispatch = useDispatch();
    // const user = useSelector(selectLoginProfile);
    const router = useRouter();
    // withRouter()

    // console.log("loginProfile", props.allOrders);

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

        if (Object.keys(store.getState().auth?.loginProfile).length === 0) {
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

        // await fetchMethod("http://localhost:3000/api/all_orders?refreshed_token" + context.req.cookies.refreshed_token, "GET", headers, {
        //     refresh_token: context.req.cookies.refresh_token
        // }, true).then(res => { 
        //     store.dispatch(loginPerson(res)); 
        // }).catch(err => store.dispatch(loginPerson(res)));

        await store.dispatch(retrieveAllOrderThunk({refreshed_token: context.req.cookies.refreshed_token}));

        return {
            props: {
                allOrders: store.getState().order.allOrders
                    // allProducts: store.getState().products.allProducts,
                    // allProductsRandomized: store.getState().products.allProductsRandomized
            }
        }
    }
);


Dashboard.layout = "L3";

export default Dashboard;