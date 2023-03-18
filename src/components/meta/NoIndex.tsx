import React from 'react';
import Head from 'next/head';

const NoIndex: React.FunctionComponent = () => (
  <Head>
    <meta name="robots" content="noindex" />
  </Head>
);

export default NoIndex;
