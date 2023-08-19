import Head from "next/head";
import { useState } from "react";
import redis from "../../../../utils/redis";
import HiddenHeader from "../../../../components/HiddenHeader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ProductPage from "../../../../components/productPage";
import { wrapper } from "../../../../store/store";
import { singleProductThunk } from "../../../../feature/productSlice/productSlice";


const ProdId = (props) => {

    const [error, setError] = useState(props.isError);
    const [singleProduct, setSingleProduct] = useState(props.singleProduct);

    return (
        <>
        {
            !error && 
            <Head>
                <title>Haven's {singleProduct ? singleProduct.product_name : ""}</title>
            </Head>
        }
            <>
                {
                    !error && 
                    <>
                        <HiddenHeader divideBy={1} />
                        <HiddenHeader divideBy={4} />
                        <Breadcrumbs divideBy={8} breadcrumbs={props.queryParams} prodId={props.prodId} pageType={"productPage"} />
                    </>   
                }
                <ProductPage 
                    prodId={props.prodId}
                    product={singleProduct}
                    setProduct={setSingleProduct}
                    setError={setError}
                />
            </>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {

        const queryParams = Object.values(ctx.query);
        console.log("queryParams in the start", queryParams);
        queryParams.pop();
        queryParams.unshift("Home");
        queryParams[1] = (queryParams[1] += "'s" + " " + queryParams[2]).replace(/(^[m|w])(\w+)(.\w\s)([t|b|a])(\w+$)/i, (all, b, c, d, e, f) => {
            return b.toUpperCase() + c.toLowerCase() + d + e.toUpperCase() + f.toLowerCase();
        });
        queryParams.pop();

        let isError = null, statusCode = null, statusText = null, singleProductObject = null;
        
        const dataInRedis = await redis.get(ctx.query.prod_id.replace(/-/, "_"), async (err, item) => {
            if (err) console.error("prod_id redis giving following error:", err);
            if (item) {
                return item;
            } else {
                await store.dispatch(singleProductThunk(ctx.query.prod_id));
                singleProductObject = store.getState().products.singleProduct;
                isError = store.getState().products.singleProductErrors;
                statusCode = store.getState().products.singleProductStatusCode;
                statusText = store.getState().products.singleProductStatusText;
                if (singleProductObject.id) {
                    await redis.set(ctx.query.prod_id.replace(/-/, "_"), JSON.stringify(store.getState().products.singleProduct));
                }
                return store.getState().products.singleProduct;
            }
        });

        if (dataInRedis) {
            singleProductObject = JSON.parse(dataInRedis);
        }

        if (singleProductObject) {
            if ("product_name" in singleProductObject) {
                queryParams.push(singleProductObject.product_name);
            }
        }

        return {
            props: {
                singleProduct: singleProductObject,
                prodId: ctx.query.prod_id,
                queryParams: queryParams,
                isError: isError,
                statusCode: statusCode,
                statusText: statusText
            }
        }
    }
);

ProdId.layout = "L1";

export default ProdId;