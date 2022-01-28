/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */

// import node_modules
import * as React from 'react';
import Head from 'next/head';
import { useTheme } from '@storylinerapp/modules';

// import types
import { ThemeEnum } from '@storylinerapp/types';

// Head component
const ThemeHead: React.FunctionComponent = () => {
  // init hooks
  const { theme } = useTheme();

  // META TAGS
  const metaTags = [
    // content
    {
      key: 'msapplication-TileColor',
      name: 'msapplication-TileColor',
      content: theme === ThemeEnum.LIGHT ? '#ffffff' : '#151515',
    },
    {
      key: 'theme-color',
      name: 'theme-color',
      content: theme === ThemeEnum.LIGHT ? '#ffffff' : '#151515',
    },
  ];

  // set head
  return (
    <Head>
      {metaTags.map(({ key, ...metaTag }) => (
        <meta key={key} {...metaTag} />
      ))}
    </Head>
  );
};

export default ThemeHead;
