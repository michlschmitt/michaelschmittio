// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Head from 'next/head';

// import types
import { AppPropsWithLayout } from '../types';

// import components
import AppProviders from '../providers/AppProviders';
import GlobalHeadLinks from '../components/meta/GlobalHead';

// import fonts
import '@fontsource/inter';

// import styles
import '../styles/index.css';

// define app component
const Website: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/* adds meta tags */}
      <Head>
        <GlobalHeadLinks />
      </Head>

      {/* render app */}
      <AppProviders>{getLayout(<Component {...pageProps} />)}</AppProviders>
    </>
  );
};

Website.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default Website;
