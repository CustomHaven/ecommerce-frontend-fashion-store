import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../components/Administrator/Dashboard";
import { loginPerson } from "../../feature/authSlice/authSlice";
import { retrieveAllOrderThunk } from "../../feature/orderSlice/orderSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { redisGet } from "../../utils/redis";
import { wrapper } from "../../store/store";
import { fetchMethod, headers } from "../../utils/generalUtils";

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const [allOrders, setAllOrders] = useState(props.allOrders);
    dispatch(controlAdminSideBar(0));

    return (
        <>
            <Head>
                <title>Administrator: Name</title>
            </Head>
            {
                <AdminDashboard 
                    allOrders={allOrders}
                    setAllOrders={setAllOrders}
                    refT={props.ctx_refresh}
                />
            }
        </>
    )
}

/*

Error:
    x You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps

    FIXED

*/

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {

        if (!store.getState().auth?.loginProfile.hasOwnProperty("user")) {
            await fetchMethod(`${process.env.FRONTEND}/api/refresh`, "POST", headers, {
                refresh_token: context.req.cookies.token_id
            }, true).then(res => {
                store.dispatch(loginPerson(res)); 
            }).catch(err => {
                console.log("we hit the first error on dashboard!", err);
                store.dispatch(loginPerson(err));
                return ({
                    redirect: {
                        permanent: false,
                        destination: "/login",
                    },
                    props:{},
                });
            });
        }

        const user = store.getState().auth.loginProfile;
        if (!user.token) {
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

        const allOrders = await redisGet("all_orders", store, "order", "allOrders", retrieveAllOrderThunk, { refreshed_token: context.req.cookies.refreshed_token });

        return {
            props: {
                allOrders: typeof allOrders === "object" ? allOrders : JSON.parse(allOrders),
                ctx_refresh: context.req.cookies.refreshed_token
            }
        }
    }
);


Dashboard.layout = "L3";

export default Dashboard;