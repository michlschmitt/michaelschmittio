import * as PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';

import { AppPropsWithLayout } from '../types';

import AppProviders from '../providers/AppProviders';
import GlobalHeadLinks from '../components/meta/GlobalHead';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import '../styles/index.css';

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
