import Head from 'next/head';
import FeatureProducts from "../components/featuredProducts";
import HiddenHeader from '../components/HiddenHeader';
import Directions from '../components/directions';


const AllProducts = () => {
    return (
        <>
            <Head>
                <title>Fashion All Products</title>
            </Head>
            <>
                <HiddenHeader />
                <FeatureProducts max={24} />
                <Directions />
            </>
        </>   
    );
}

export default AllProducts;