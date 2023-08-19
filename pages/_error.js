import Head from "next/head";
// import { useState } from "react";
import HiddenHeader from "../components/HiddenHeader";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorPage from "../components/errorPage";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Error = (props) => {
    // const [resetAll, setResetAll] = useState(props.resetValues);
    // console.log("statusCode", props);
    const { windowWidth } = useWindowDimensions();
    return (
        <>
            <Head>
                <title>{props.statusText ? props.statusText : "Page not found!"}</title>
            </Head>
            <HiddenHeader divideBy={1} />
            <HiddenHeader divideBy={16} />
            {/* <Breadcrumbs divideBy={windowWidth > 500 ? 4 : 2} breadcrumbs={["Home", "Error"]} pageType={"errorPage"} /> */}
            <ErrorPage status={props.statusCode} resetValues={props.resetValues} />
        </>
    )
}

Error.layout = "L1";

export default Error;