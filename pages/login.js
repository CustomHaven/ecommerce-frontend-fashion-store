import Head from 'next/head';
import HiddenHeader from "../components/HiddenHeader";
import SignOn from "../components/SignOn";

const Login = (props) => {
    return (
        <>
            <Head>
                <title>Haven Login Page</title>
            </Head>
            <HiddenHeader divideBy={1} />
            {/* <HiddenHeader divideBy={4} /> */}
            <SignOn
                header={"Login"}
                pageType={"loginPage"}
                theBackgroundImage={"/assets/login_background.jpg"}
                theBannerImage={"/assets/login_front.jpg"}
                bannerALT={"Login Lock"}
            />
        </>
    )
}

Login.layout = "L1";

export default Login