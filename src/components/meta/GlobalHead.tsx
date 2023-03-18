/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */

import React from 'react';

import { rootDomain } from '../../../config';

const GlobalHeadLinks: React.FunctionComponent = () => {
  // META TAGS
  const metaTags = [
    // content
    { key: 'charSet', charSet: 'utf-8' },
    {
      key: 'viewport',
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      key: 'msapplication-TileImage',
      name: 'msapplication-TileImage',
      content: `${rootDomain}/ms-icon-144x144.png`,
    },
    {
      key: 'msapplication-TileColor',
      name: 'msapplication-TileColor',
      content: '#5E6AD2',
    },
    {
      key: 'theme-color',
      name: 'theme-color',
      content: '#5E6AD2',
    },

    // prerender
    { key: 'prerender', name: 'fragment', content: '!' },
  ];

  // LINKS
  const linkTags = [
    {
      href: `${rootDomain}/favicon.ico`,
      key: 'shortcut icon',
      rel: 'shortcut icon',
      type: 'image/x-icon',
    },
    {
      href: `${rootDomain}/favicon.png`,
      key: 'icon',
      rel: 'icon',
      type: 'image/x-icon',
    },
    {
      href: `${rootDomain}/apple-icon.png`,
      key: 'apple-touch-icon',
      rel: 'apple-touch-icon',
    },
    {
      href: `${rootDomain}/apple-icon-57x57.png`,
      key: 'apple-touch-icon-57x57',
      rel: 'apple-touch-icon',
      sizes: '57x57',
    },
    {
      href: `${rootDomain}/apple-icon-60x60.png`,
      key: 'apple-touch-icon-60x60',
      rel: 'apple-touch-icon',
      sizes: '60x60',
    },
    {
      href: `${rootDomain}/apple-icon-72x72.png`,
      key: 'apple-touch-icon-72x72',
      rel: 'apple-touch-icon',
      sizes: '72x72',
    },
    {
      href: `${rootDomain}/apple-icon-76x76.png`,
      key: 'apple-touch-icon-76x76',
      rel: 'apple-touch-icon',
      sizes: '76x76',
    },
    {
      href: `${rootDomain}/apple-icon-114x114.png`,
      key: 'apple-touch-icon-114x114',
      rel: 'apple-touch-icon',
      sizes: '114x114',
    },
    {
      href: `${rootDomain}/apple-icon-120x120.png`,
      key: 'apple-touch-icon-120x120',
      rel: 'apple-touch-icon',
      sizes: '120x120',
    },
    {
      href: `${rootDomain}/apple-icon-144x144.png`,
      key: 'apple-touch-icon-144x144',
      rel: 'apple-touch-icon',
      sizes: '144x144',
    },
    {
      href: `${rootDomain}/apple-icon-152x152.png`,
      key: 'apple-touch-icon-152x152',
      rel: 'apple-touch-icon',
      sizes: '152x152',
    },
    {
      href: `${rootDomain}/apple-icon-180x180.png`,
      key: 'apple-touch-icon-180x180',
      rel: 'apple-touch-icon',
      sizes: '180x180',
    },
    {
      href: `${rootDomain}/android-icon-192x192.png`,
      key: 'shortcut icon',
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      href: `${rootDomain}/favicon.png`,
      key: 'icon-192x192',
      rel: 'icon',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      href: `${rootDomain}/favicon-16x16.png`,
      key: 'icon-16x16',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      href: `${rootDomain}/favicon-32x32.png`,
      key: 'icon-32x32',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      href: `${rootDomain}/favicon-96x96.png`,
      key: 'icon-96x96',
      rel: 'icon',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      href: `${rootDomain}/manifest.json`,
      key: 'manifest',
      rel: 'manifest',
    },
  ];

  // set head
  return (
    <>
      {metaTags.map(({ key, ...metaTag }) => (
        <meta key={key} {...metaTag} />
      ))}
      {linkTags.map(({ key, ...linkTag }) => (
        <link key={key} {...linkTag} />
      ))}
    </>
  );
};

export default GlobalHeadLinks;
