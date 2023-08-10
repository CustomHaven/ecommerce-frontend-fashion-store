import Head from 'next/head';
import HiddenHeader from "../components/HiddenHeader";
import SignOn from "../components/SignOn";
import { wrapper } from '../store/store';
import { loginPerson } from '../feature/authSlice/authSlice';
import { fetchMethod, headers } from '../utils/generalUtils';

const Register = (props) => {
    return (
        <>
            <Head>
                <title>Haven Register Page</title>
            </Head>
            <HiddenHeader divideBy={1} />
            {/* <HiddenHeader divideBy={4} /> */}
            <SignOn
                header={"Register"}
                pageType={"registerPage"}
                theBackgroundImage={"/assets/register_background.jpg"}
                theBannerImage={"/assets/register_front.jpg"}
                bannerALT={"Register Lock"}
            />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        console.log("CONTEXT START!");
        console.log(context.cookies);
        console.log("CONTEXT COOKIE DONE!");
        if (Object.keys(store.getState().auth?.loginProfile).length === 0) {
            await fetchMethod(`${process.env.FRONTEND}/api/refresh`, "POST", headers, {
                refresh_token: context.req.cookies.refresh_token
            }, true).then(res => { 
                store.dispatch(loginPerson(res)); 
    
            });
        }
// LOOP!

        console.log("REGISTERUSER!");
        // console.log("THE PROFILE!!", store.getState().auth.loginProfile);
        // if (store.getState().auth?.loginProfile?.user) {
        //     console.log("AVAILABLE!");
        // } else {
        //     console.log("NOT AVAILABLE!");
        // }

        const user = store.getState().auth.loginProfile;

        if (user.token !== (null || undefined)) {
            console.log("NO NOT UNDEFINED / NULL we have!")
            if (user?.user?.role === "Administrator") {
                console.log("THEYA ARE ADMIN!");
                // console.log(user);
                return {
                    redirect: {
                        destination: '/admin/dashboard',
                        permanent: false,
                    }
                }
            } else {
                console.log("SORRY OTHER PPL!")
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }
        // return { 
        //     props: { 
        //         user: Object.keys(store.getState().auth?.loginProfile).length === 0 ? null : store.getState().auth?.loginProfile
        //     } 
        // }
    }
)

Register.layout = "L1";

export default Register;