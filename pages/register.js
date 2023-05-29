import Head from 'next/head';
import HiddenHeader from "../components/HiddenHeader";
import SignOn from "../components/SignOn";

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

Register.layout = "L1";

export default Register