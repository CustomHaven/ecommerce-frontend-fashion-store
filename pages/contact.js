import Head from "next/head";
import HiddenHeader from "../components/HiddenHeader";
import ContactUs from "../components/ContactUs";

const Contact = (props) => {
    return (
        <>
            <Head>
                <title>Contact us at Haven</title>
            </Head>
            <HiddenHeader divideBy={1} />
            {/* <HiddenHeader divideBy={4} /> */}
            <ContactUs 
                src={"/assets/contactus.jpg"}
                // eService={props.eService}
                // eTemplate={props.eTemplate}
                // ePublic={props.ePublic}
                countryData={props.countryData}
            />
        </>
    )
}

export const getServerSideProps = () => {
    console.log("process.env.ETEMPLATE", process.env.ETEMPLATE);
    return {
        props: {
            // eService: process.env.E_SERVICE,
            // eTemplate: process.env.E_TEMPLATE,
            // ePublic: process.env.E_PUBLIC,
            countryData: process.env.COUNTRY_DATA
        }
    }
};

Contact.layout = "L1";

export default Contact;