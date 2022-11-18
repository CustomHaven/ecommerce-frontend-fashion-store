import Head from 'next/head';
import Hero from "../components/homepage_components/hero";
import FeatureProducts from "../components/featuredProducts";
import Guarantee from '../components/homepage_components/guarantee';
import ShopCategory from "../components/homepage_components/shopCategory";
import Newsletter from "../components/homepage_components/newsletter";

export default function Home() {
  const src = "/assets/ladybanner-removebg.png";
  return (
    <>
      <Head>
        <title>Fashion Home Page</title>
      </Head>
      <>
        <Hero src={src} />
        <FeatureProducts max={8} />
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
  // const ecom = await Axios.get("https://google.com");
  return {
      props: {
          removeData: data,
          // ecom: ecom.data
      }
  };
};
*/