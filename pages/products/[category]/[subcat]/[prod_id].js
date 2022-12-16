import Head from "next/head";
import HiddenHeader from "../../../../components/HiddenHeader";
import { wrapper } from "../../../../store/store";
import { singleProductThunk } from "../../../../feature/productSlice/productSlice";


// TODO!

const ProdId = (props) => {
    return (
        <>
            <Head>
                <title>Haven's {props.singleProduct.product_name}</title>
            </Head>
            <>
                <HiddenHeader divideBy={1} />
                <HiddenHeader divideBy={4} />
                <div>WELCOME TO THE {props.prodId} of {props.singleProduct.product_name} page!</div>
            </>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
        console.log("CTX ROUTER!!", ctx.query);
        // const router = useRouter();
        // const { prod_id } = router.query;
        await store.dispatch(singleProductThunk(ctx.query.prod_id));

        return {
            props: {
                singleProduct: store.getState().products.singleProduct,
                prodId: ctx.query.prod_id
            }
        }
    }
);

export default ProdId;