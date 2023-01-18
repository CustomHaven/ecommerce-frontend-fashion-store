import Head from "next/head";
import Error from "../../../_error";
import HiddenHeader from "../../../../components/HiddenHeader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import ProductPage from "../../../../components/productPage";
import { wrapper } from "../../../../store/store";
import { singleProductThunk } from "../../../../feature/productSlice/productSlice";


const ProdId = (props) => {

    if (props.isError) {
        return <Error statusCode={props.statusCode} statusText={props.statusText} resetValues={true} />
    }

    const productImagesArray = [].concat(props.singleProduct.ProductImages.map(val => Object.assign({}, {
        idImage: val.id.replace(/^(.+)$/, "image-id-$1"),
        imgName: val.image_name,
        imgData: val.image_data
    })));

    const productBannerImage = Object.assign({}, {
        idImage: props.singleProduct.ProductBannerImage.id.replace(/^(.+)$/, "banner-id-$1"),
        imgName: props.singleProduct.ProductBannerImage.banner_image_name,
        imgData: props.singleProduct.ProductBannerImage.banner_image_data
    });


    productImagesArray.unshift(productBannerImage);

    const singleProduct = Object.assign({}, {...props.singleProduct, images: productImagesArray}) // work from here!

    delete singleProduct["ProductBannerImage"];
    delete singleProduct["ProductImages"];


    return (
        <>
            <Head>
                <title>Haven's {props.singleProduct.product_name}</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                <Breadcrumbs divideBy={8} breadcrumbs={props.queryParams} pageType={"productPage"} />
                <ProductPage product={singleProduct}/>
            </>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {

        const queryParams = Object.values(ctx.query);
        queryParams.pop();
        queryParams.unshift("Home");
        queryParams[1] = (queryParams[1] += "'s" + " " + queryParams[2]).replace(/(^[m|w])(\w+)(.\w\s)([t|b|a])(\w+$)/i, (all, b, c, d, e, f) => {
            return b.toUpperCase() + c.toLowerCase() + d + e.toUpperCase() + f.toLowerCase();
        });
        queryParams.pop();

        await store.dispatch(singleProductThunk(ctx.query.prod_id));

        const isError = store.getState().products.singleProductErrors;
        const statusCode = store.getState().products.singleProductStatusCode;
        const statusText = store.getState().products.singleProductStatusText;

        const singleProductObject = store.getState().products.singleProduct;

        if ("product_name" in singleProductObject) {
            queryParams.push(store.getState().products.singleProduct.product_name);
        }


        console.log("queryParams!", queryParams);


        return {
            props: {
                singleProduct: store.getState().products.singleProduct,
                prodId: ctx.query.prod_id,
                queryParams: queryParams,
                isError: isError,
                statusCode: statusCode,
                statusText: statusText
            }
        }
    }
);

export default ProdId;