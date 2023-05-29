import Head from 'next/head';
import HiddenHeader from "../components/HiddenHeader";
import LoginPage from "../components/LoginPage";

const Login = (props) => {
    return (
        <>
            <Head>
                <title>Haven Login Page</title>
            </Head>
            <HiddenHeader divideBy={1} />
            {/* <HiddenHeader divideBy={4} /> */}
            <LoginPage />
        </>
    )
}

Login.layout = "L1";

export default Login