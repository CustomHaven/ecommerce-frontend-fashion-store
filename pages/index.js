import Head from 'next/head';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { redisGet } from '../utils/redis';
import Hero from "../components/homepage_components/hero";
import FeatureProducts from "../components/productlist_components/featuredProducts";
import Directions from '../components/productlist_components/directions';
import Guarantee from '../components/homepage_components/guarantee';
import ShopCategory from "../components/homepage_components/shopCategory";
import Newsletter from "../components/homepage_components/newsletter";
import { wrapper } from '../store/store';
import { selectAllProductsRandomized, allProductsThunk } from "../feature/productSlice/productSlice";

export default function Home(props) {

  const [allProducts] = useState(props.allProducts);
  const [allRandomProducts, setAllRandomProducts] = useState(props.allProductsRandomized);
  const productsDirectionsHelper = useSelector(selectAllProductsRandomized);

  return (
    <>
      <Head>
        <title>Fashion Home Page</title>
      </Head>
      <>
        <Hero src={"/assets/ladybanner-removebg.png"} />
        <FeatureProducts 
          allProducts={allProducts}
          usingProducts={allRandomProducts}
          setUsingProducts={setAllRandomProducts}
          displayMax={8}
          headerText={"Featured Products"}
          subHeader={"New Modern Design Collection"}
          categoryPage={""}
          pageType={"Home"}
          homePageOrAllShopPage={"Homepage Or All Products Shop page"}
          homePage={"Homepage"}
          updatePage={"Homepage"} 
        />
        {
          productsDirectionsHelper &&
          <Directions />
        }
        <Guarantee />
        <ShopCategory />
        <Newsletter />
      </>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk);
    const allRandomProducts = await redisGet("all_products_randomized", store, "products", "allProductsRandomized", allProductsThunk);

    return {
      props: {
        storeProducts: store.getState().products.allProducts,
        storeRandom: store.getState().products.allProductsRandomized,
        allProducts: typeof allProducts === "object" ? allProducts : JSON.parse(allProducts),
        allProductsRandomized: typeof allRandomProducts === "object" ? allRandomProducts : JSON.parse(allRandomProducts),
      }
    }
  }
);

Home.layout = "L1";