import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from "next/head"
import Script from 'next/script';
import { Provider } from 'react-redux';
// import store from '../store/store';
import { wrapper } from '../store/store';

/*
Do not add <script> tags using next/head (see <script> tag with src="https://unpkg.com/ml5@latest/dist/ml5.min.js"). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component
*/

// function MyApp({ Component, pageProps }) {
function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  // const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const {  pageProps } = props;
  return (
    <>
      {/* <Head> */}
        {/* <Script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" /> */}
        {/* <link rel="stylesheet" href={reset} /> */}
      {/* </Head> */}
      <Provider store={store}>
        {/* <CacheProvider value={emotionCache}> */}
          <Layout><Component {...pageProps} /></Layout>
        {/* </CacheProvider> */}
      </Provider>
    </>
  );
};

export default MyApp;

// old way not using provider or useWrappedStore and going straight to below
// export default wrapper.withRedux(MyApp);


