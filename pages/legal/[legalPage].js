import Head from 'next/head';
import { useState } from 'react';
import HiddenHeader from "../../components/HiddenHeader";
import Error from '../_error';
import Legals from '../../components/Legals';
import { fetchLegalThunk } from '../../feature/legalSlice/legalSlice';
import redis from '../../utils/redis';
import { wrapper } from '../../store/store';

const LegalPage = (props) => {
    const { error, legalHeader, pageType, legal } = props;
    if (error) {
        return <Error statusCode={404} resetValues={true} />
    }
    const [ legalState, setLegalState ] = useState(legal);
    return (
        <>
            <Head>
                <title>{ legalHeader === "About" ? "About Haven" : "Haven " + legalHeader }</title>
            </Head>
            <HiddenHeader divideBy={1} />
            <HiddenHeader divideBy={16} />
            <Legals 
                legal={legalState}
                setLegal={setLegalState}
                pageType={pageType}
                header={legalHeader}
            />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        const legalPage = ctx.query.legalPage.toLowerCase();
        const legalPages = ["about", "delivery-information", "privacy-policy", "terms-and-conditions"];
        const reg = /\b([a-z])/g;

        let error;
        if (legalPages.find(v => v === legalPage.toLowerCase()) === undefined) {
            error = true;
        } else {
            error = false;
        }

        if (error) {
            return {
                props: {
                    error
                }
            }
        }

        let pageKey;
        if (legalPage === "about") {
            pageKey = "about_us";
        } else (
            pageKey = legalPage.replace(/-/g, "_")
        )

        const legal = await redis.get(pageKey, async (err, items) => {
            if (err) console.log("we have err in redis for some reasons.", err);
            if (items) {
                return items;
            } else {
                await store.dispatch(fetchLegalThunk({}));
                const fetchedItems = store.getState()["legal"]["legal"];
                if (fetchedItems.constructor === Object) {
                    if (Object.keys(fetchedItems).length === 0) {
                        return;
                    }
                }
                await redis.set(pageKey, JSON.stringify({ [pageKey]: fetchedItems[pageKey] } ));
                return { [pageKey]: fetchedItems[pageKey] };
            }
        });

        console.log("legal redis?", legal);

        return {
            props: {
                legal: typeof legal === "object" ? legal : JSON.parse(legal),
                legalHeader: legalPage.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1)).replace(/-/g, " "),
                pageType: pageKey
            }
        }
    }
);

LegalPage.layout = "L1";

export default LegalPage;