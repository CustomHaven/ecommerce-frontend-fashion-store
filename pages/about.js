import Head from 'next/head';
import { useState } from 'react';
import HiddenHeader from "../components/HiddenHeader";
import Legals from '../components/Legals';
import { fetchLegalThunk } from '../feature/legalSlice/legalSlice';
import redis from '../utils/redis';
import { wrapper } from '../store/store';

const About = (props) => {
    // const
    // console.log("props.legal", props.legal);
    return (
        <>
            <Head>
                <title>Haven About Us</title>
            </Head>
            <HiddenHeader divideBy={1} />
            <HiddenHeader divideBy={16} />
            <Legals />

        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        // await store.dispatch(allProductsThunk());

        // const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk);

        // const allRandomProducts = await redisGet("all_products_randomized", store, "products", "allProductsRandomized", allProductsThunk);
        const legal = await redis.get("about_us", async (err, items) => {
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

                await redis.set("about_us", JSON.stringify(fetchedItems));
                return fetchLegalThunk;
            }
        });


        return {
            props: {
                legal: typeof legal === "object" ? legal : JSON.parse(legal)
                // allProducts: JSON.parse(allProducts),
                // allProductsRandomized: JSON.parse(allRandomProducts),
            }
        }
    }
);

About.layout = "L1";

export default About;