import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminCustomers from "../../components/Administrator/Customers";
import { loginPerson } from "../../feature/authSlice/authSlice";
import { redisGet } from "../../utils/redis";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { wrapper } from "../../store/store";
import { fetchMethod, headers } from "../../utils/generalUtils";
import { allUsersOrdersThunk } from "../../feature/userSlice/userSlice";

const Customers = (props) => {
    const dispatch = useDispatch();
    const [allCustomers, setAllCustomers] = useState(props.allCustomers);
    dispatch(controlAdminSideBar(3));
    return (
        <>
            <Head>
                <title>Admin Customers</title>
            </Head>
            <AdminCustomers 
                allCustomers={allCustomers}
                setAllCustomers={setAllCustomers}
                refT={props.ctx_refresh}
            />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        // /
        if (!store.getState().auth?.loginProfile.hasOwnProperty("user")) {
            await fetchMethod(`${process.env.FRONTEND}/api/refresh`, "POST", headers, {
            // await fetchMethod("https://custom-haven-ecommerce.vercel.app/api/refresh", "POST", headers, {
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

        const allCustomers = await redisGet("all_customers", store, "user", "allUsersOrders", allUsersOrdersThunk, { refreshed_token: context.req.cookies.refreshed_token });

        return {
            props: {
                allCustomers: typeof allCustomers === "object" ? allCustomers : JSON.parse(allCustomers),
                ctx_refresh: context.req.cookies.refreshed_token
            }
        }
    }
);

Customers.layout = "L3";

export default Customers;