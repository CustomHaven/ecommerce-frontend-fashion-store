import Head from "next/head";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../components/Administrator/Dashboard";
import { controlAdminSideBar } from "../../feature/generalComponents/generalComponentSlice";
import { wrapper } from "../../store/store";

const Profile = () => {
    const dispatch = useDispatch();
    dispatch(controlAdminSideBar(0));

    return (
        <>
            <Head>
                <title>Administrator: Name</title>
            </Head>
            <AdminDashboard />
        </>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async () => {
//         await store.dispatch(allProductsThunk());

//         return {
//             props: {
//                 allProducts: store.getState().products.allProducts,
//                 allProductsRandomized: store.getState().products.allProductsRandomized
//             }
//         }
//     }
// );

Profile.layout = "L3";

export default Profile;