import '../styles/reset.css';
import '../styles/globals.css';
import Layout1 from '../components/Layout/Layout';
import CheckoutLayout from '../components/Layout/CheckoutLayout';
import AdminLayout from '../components/Layout/AdminLayout';
import { Provider } from 'react-redux';
// import store from '../store/store';
import { wrapper } from '../store/store';

const layouts = {
  L1: Layout1,
  L2: CheckoutLayout,
  L3: AdminLayout,
};

/*
Do not add <script> tags using next/head (see <script> tag with src="https://unpkg.com/ml5@latest/dist/ml5.min.js"). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component
*/

// function MyApp({ Component, pageProps }) {
function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  // console.log("APP LEVEL WHAT IS REST?", rest);
  // const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const {  pageProps } = props;


  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);


  return (
    <>
      {/* <Head> */}
        {/* <Script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" /> */}
        {/* <link rel="stylesheet" href={reset} /> */}
      {/* </Head> */}
      <Provider store={store}>
        {/* <CacheProvider value={emotionCache}> */}
          {/* { */}
              <Layout><Component {...pageProps} /></Layout>
              
          
        {/* </CacheProvider> */}
      </Provider>
    </>
  );
};

export default MyApp;

// old way not using provider or useWrappedStore and going straight to below
// export default wrapper.withRedux(MyApp);


