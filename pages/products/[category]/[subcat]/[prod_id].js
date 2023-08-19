import Head from "next/head";
import { useState, useEffect } from "react";
import Error from "../../../_error";
import redis from "../../../../utils/redis";
import HiddenHeader from "../../../../components/HiddenHeader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ProductPage from "../../../../components/productPage";
import { wrapper } from "../../../../store/store";
import { singleProductThunk } from "../../../../feature/productSlice/productSlice";


const ProdId = (props) => {

    const [error, setError] = useState(props.isError);
    const [statusCode, setStatusCode] = useState(0);
    const [statusText, setStatusText] = useState("");

    // if (error) {
    //     return <Error statusCode={statusCode} statusText={statusText} resetValues={true} />
    // }

    const [singleProduct, setSingleProduct] = useState(props.singleProduct);

    // if (!props.singleProduct) {
    //     return;
    // }

    // const [theSingleProduct, setTheSingleProduct] = useState(props.singleProduct);



    // useEffect(() => {
        // if (props.singleProduct) {


    
            // setTheSingleProduct(singleProductCopy);
        // }
    // }, [props.singleProduct]);


    // console.log("theSingleProduct", singleProductCopy);

    console.log("what is query params", props.queryParams);

    console.log("props.singleProduct what is it?", props.singleProduct);

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
                    setStatusCode={setStatusCode}
                    setStatusText={setStatusText}
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

        console.log("queryParams before store dispatch!", queryParams);

        let isError = null, statusCode = null, statusText = null, singleProductObject = null;
        
        const dataInRedis = await redis.get(ctx.query.prod_id.replace(/-/, "_"), async (err, item) => {
            if (err) console.error("prod_id redis giving following error:", err);
            if (item) {
                console.log("item was found!");
                return item;
            } else {
                console.log("item not found!");
                await store.dispatch(singleProductThunk(ctx.query.prod_id));
                singleProductObject = store.getState().products.singleProduct;
                isError = store.getState().products.singleProductErrors;
                statusCode = store.getState().products.singleProductStatusCode;
                statusText = store.getState().products.singleProductStatusText;
                console.log("all negative errors inside the redis else!:", isError, statusCode, statusText, singleProductObject);
                if (singleProductObject.id) {
                    await redis.set(ctx.query.prod_id.replace(/-/, "_"), JSON.stringify(store.getState().products.singleProduct));
                }
                return store.getState().products.singleProduct;
            }
        });

        console.log("dataInRedis", dataInRedis);

        if (dataInRedis) {
            singleProductObject = JSON.parse(dataInRedis);
        }

        // await store.dispatch(singleProductThunk(ctx.query.prod_id));

        // const isError = store.getState().products.singleProductErrors;
        // const statusCode = store.getState().products.singleProductStatusCode;
        // const statusText = store.getState().products.singleProductStatusText;

        // const singleProductObject = store.getState().products.singleProduct;

        if (singleProductObject) {
            if ("product_name" in singleProductObject) {
                // queryParams.push(store.getState().products.singleProduct.product_name);
                queryParams.push(singleProductObject.product_name);
            }
        }

        console.log("singleProductObject looking back", singleProductObject);

        console.log("all negative errors:", isError, statusCode, statusText);

        console.log("queryParams in the final end!", queryParams);
        console.log("ctx.query.prod_id", ctx.query.prod_id);

        return {
            props: {
                // singleProduct: store.getState().products.singleProduct,
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