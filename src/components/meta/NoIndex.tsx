// import node_modules
import * as React from 'react';
import Head from 'next/head';

// define component
const NoIndex: React.FunctionComponent = () => (
  <Head>
    <meta name="robots" content="noindex" />
  </Head>
);

export default NoIndex;
