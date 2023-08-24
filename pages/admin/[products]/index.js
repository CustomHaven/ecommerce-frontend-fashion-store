import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminProductListing from "../../../components/Administrator/ProductListing";
import { controlAdminSideBar } from "../../../feature/generalComponents/generalComponentSlice";
import { loginPerson } from "../../../feature/authSlice/authSlice";
import { allProductsThunk } from "../../../feature/productSlice/productSlice";
import { redisGet } from "../../../utils/redis";
import { wrapper } from "../../../store/store";
import { fetchMethod, headers } from "../../../utils/generalUtils";

const Products = (props) => {
    const dispatch = useDispatch();
    const [allProducts, setAllProducts] = useState(props.allProducts);

    dispatch(controlAdminSideBar(2));
    return (
        <>
            <Head>
                <title>PRODCUTS</title>
            </Head>
            <AdminProductListing
                allProducts={allProducts}
                setAllProducts={setAllProducts}
            />
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

        const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk);

        return {
            props: {
                allProducts: typeof allProducts === "object" ? allProducts : JSON.parse(allProducts),
            }
        }
    }
);


Products.layout = "L3";

export default Products;