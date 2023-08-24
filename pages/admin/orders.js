import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminOrders from "../../components/Administrator/Orders";
import { loginPerson } from "../../feature/authSlice/authSlice";
import { retrieveAllOrderThunk } from "../../feature/orderSlice/orderSlice";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { redisGet } from "../../utils/redis";
import { wrapper } from "../../store/store";
import { fetchMethod, headers } from "../../utils/generalUtils";

const Orders = (props) => {
    const dispatch = useDispatch();
    const [allOrders, setAllOrders] = useState(props.allOrders);
    dispatch(controlAdminSideBar(1));
    return (
        <>
            <Head>
                <title>Customer Orders</title>
            </Head>
            {
                <AdminOrders 
                    allOrders={allOrders}
                    setAllOrders={setAllOrders}
                    refT={props.ctx_refresh}
                />
            }
        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        // /
        if (!store.getState().auth?.loginProfile.hasOwnProperty("user")) {
            await fetchMethod(`${process.env.FRONTEND}/api/refresh`, "POST", headers, {
                refresh_token: context.req.cookies.refresh_token
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

Orders.layout = "L3";

export default Orders;