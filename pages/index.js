import Head from 'next/head';
import Hero from "../components/hero";
import FeatureProducts from "../components/featuredProducts";
import Guarantee from '../components/guarantee';
import ShopCategory from "../components/shopCategory";
import Newsletter from "../components/newsletter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fashion Home Page</title>
      </Head>
      <>
        <Hero />
        <FeatureProducts />
        <Guarantee />
        <ShopCategory />
        <Newsletter />
      </>
    </>
  )
}

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
  const data = await fetch("http://localhost:5000/api/v2/bg-remover", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
          url: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a",
          alt: "beautiful_lady"
      }),
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
  });
  // const ecom = await Axios.get("https://api-custom-ecommerce-pern.onrender.com/api/v2/products");
  return {
      props: {
          removeData: data,
          // ecom: ecom.data
      }
  };
};
*/