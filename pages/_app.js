import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from "next/head"
import Script from 'next/script'
import '../styles/reset.css';

/*
Do not add <script> tags using next/head (see <script> tag with src="https://unpkg.com/ml5@latest/dist/ml5.min.js"). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component
*/

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Head> */}
        {/* <Script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" /> */}
        {/* <link rel="stylesheet" href={reset} /> */}
      {/* </Head> */}
      <Layout><Component {...pageProps} /></Layout>
    </>
  );
};

export default MyApp
