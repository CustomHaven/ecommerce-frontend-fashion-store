import Head from "next/head";
import { useState,  useEffect } from "react";
import HiddenHeader from "../components/HiddenHeader";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorPage from "../components/error";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Error = () => {
    const [breadcrumbs, setBreadcrumbs] = useState(["Home", "Error"]);

    const { windowWidth } = useWindowDimensions();
    return (
        <>
            <Head>
                <title>Page not found!</title>
            </Head>
            <HiddenHeader divideBy={1} />
            <HiddenHeader divideBy={8} />
            <Breadcrumbs divideBy={windowWidth > 500 ? 4 : 2} breadcrumbs={breadcrumbs} pageType={"errorPage"} />
            <ErrorPage />
        </>
    )
}

export default Error;