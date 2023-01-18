import Head from 'next/head';
import { useSelector } from "react-redux";
import Hero from "../components/homepage_components/hero";
import FeatureProducts from "../components/productlist_components/featuredProducts";
import Directions from '../components/productlist_components/directions';
import Guarantee from '../components/homepage_components/guarantee';
import ShopCategory from "../components/homepage_components/shopCategory";
import Newsletter from "../components/homepage_components/newsletter";
import { wrapper } from '../store/store';
import { selectAllProductsRandomized, allProductsThunk } from "../feature/productSlice/productSlice";

export default function Home(props) {
  const allProducts = useSelector(selectAllProductsRandomized);
  const src = "/assets/ladybanner-removebg.png";
  return (
    <>
      <Head>
        <title>Fashion Home Page</title>
      </Head>
      <>
        <Hero src={src} />
        <FeatureProducts products={allProducts} displayMax={8} headerText={"Featured Products"} categoryPage={""} pageType={"Home"} />
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
    await store.dispatch(allProductsThunk());

    return {
      props: {
        allProducts: store.getState().products.allProducts,
        allProductsRandomized: store.getState().products.allProductsRandomized
      }
    }
  }
);


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