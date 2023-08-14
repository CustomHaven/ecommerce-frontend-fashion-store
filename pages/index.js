import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from "react-redux";
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
  // console.log("allProducts INSIDE MAIN FUNC REDIS?!??!??", props.allProducts);
  const [allProducts, setAllProducts] = useState(props.allProducts);
  const [allRandomProducts, setAllRandomProducts] = useState(props.allProductsRandomized);
  // console.log("WE SEE THIS FRONTEND?!", allRandomProducts);
  // const dispatch = useDispatch();
  // if (!props.allProducts) {
  //   dispatch(allProductsThunk());
  // }
  // const allProducts = useSelector(selectAllProductsRandomized);
  const src = "/assets/ladybanner-removebg.png";
  // console.log(allProducts)
  return (
    <>
      <Head>
        <title>Fashion Home Page</title>
      </Head>
      <>
        <Hero src={src} />
        <FeatureProducts 
          allProducts={allProducts}
          usingProducts={allRandomProducts}
          setUsingProducts={setAllRandomProducts}
          // allTheRandomProducts={allRandomProducts}
          // setAllRandomProducts={setAllRandomProducts}
          displayMax={8}
          headerText={"Featured Products"}
          subHeader={"New Modern Design Collection"}
          categoryPage={""}
          pageType={"Home"} />
        <Directions />
        <Guarantee />
        <ShopCategory />
        <Newsletter />
      </>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // redisClient.hSet("allProducts",)
    console.log("before we start the redis.get");

    const allProducts = await redisGet("all_products", store, "products", "allProducts", allProductsThunk);

    const allRandomProducts = await redisGet("all_products_randomized", store, "products", "allProductsRandomized", allProductsThunk);

    // const allProducts = await redis.get("all_products", async (err, products) => {
    //   console.log("We are in the redis.get! allProducts");
    //   if (err) console.error("err", err);
    //   if (products != null) {
    //     console.log("allProducts DONE IT COMPLETELY!");
    //     await store.dispatch(allProductsThunk());
    //     // console.log("store.getState().products.allProducts", store.getState().products.allProducts.length);
    //     return products;
    //   } else {
    //     await store.dispatch(allProductsThunk());
    //     console.log("THE HOME INDEX WRAPPER INSIDE THE REDIS ELSE,", typeof store.getState().products.allProducts);
    //     await redis.set("all_products", JSON.stringify(store.getState().products.allProducts));
    //     return store.getState().products.allProducts;
    //   }
    // });

    console.log("allProducts REDIS?!??!??", allProducts);
    console.log("WORKED!?")

    // const allRandomProducts = await redis.get("all_products_randomized", async (err, products) => {
    //   console.log("We are in the redis.get! randoms");
    //   if (err) console.error(err);
    //   if (products != null) {
    //     // console.log("WE HAVE THE RANDOMPRODUCTS!", products.length);
    //     return products;
    //   } else {
    //     await store.dispatch(allProductsThunk());
    //     await redis.set("all_products_randomized", JSON.stringify(store.getState().products.allProductsRandomized));
    //     return store.getState().products.allProductsRandomized;
    //   }
    // });

    // console.log("allProducts REDIS?!??!??", typeof allProducts);
    console.log("randoms Backend START!", typeof allRandomProducts);
    console.log("RANDOMS backendDONE FISNIHED!");
    // await store.dispatch(allProductsThunk());
    // redisClient.set("all_products", JSON.stringify(store.getState().products.allProducts));
    // redisClient.set("all_products_randomized", JSON.stringify(store.getState().products.allProductsRandomized));
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

/*
export async function getServerSideProps() {
  
  return {
    props: {}, // will be passed to the page component as props
  }
}
*/
/*
export const getStaticProps = async () => {
  const ss = "https://images.unsplash.com/photo-1601762603339-fd61e28b698a";
  const data = await fetch("http://localhost:5000/api/v2/bg-remover/cloudinary", {
      method: "POST",
      body: JSON.stringify({
          file: ss,
          publicId: "lady_standing_tall"
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return {
      props: {
          bgImage: data
      }
  }
};
*/

/*
export const getStaticProps = async () => {
  // const data = await fetch("http://localhost:5000/api/v2/bg-remover", {
  //     method: "POST",
  //     mode: 'cors',
  //     body: JSON.stringify({
  //         url: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a",
  //         alt: "beautiful_lady"
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  // });
  const api = await Promise.resolve(haven.productDisplayImage());
  // const ecom = await Axios.get("https://google.com");
  return {
      props: {
          haven: api
          // ecom: ecom.data
      }
  };
};
*/