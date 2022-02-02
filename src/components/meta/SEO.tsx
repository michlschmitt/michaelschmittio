/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */

// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

// SEO component
const SEO: React.FunctionComponent<{
  description: string;
  image: string;
  title: string;
}> = ({ title, description, image }) => {
  // init hooks
  const { asPath } = useRouter();

  // init vars
  const brandedTitle = title;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${asPath}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${image}`;

  // META TAGS
  const metaTags = [
    // content
    { key: 'description', name: 'description', content: description },
    { key: 'image', name: 'image', content: imageUrl },

    // facebook
    { key: 'og:description', property: 'og:description', content: description },
    { key: 'og:image', property: 'og:image', content: imageUrl },
    { key: 'og:image:height', property: 'og:image:height', content: '900' },
    { key: 'og:image:width', property: 'og:image:width', content: '1440' },
    { key: 'og:title', property: 'og:title', content: title },
    { key: 'og:type', property: 'og:type', content: 'website' },
    { key: 'og:url', property: 'og:url', content: canonicalUrl },

    // twitter
    { key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { key: 'twitter:site', name: 'twitter:site', content: '@michlschmitt' },
    { key: 'twitter:creator', name: 'twitter:creator', content: '@michlschmitt' },
    { key: 'twitter:description', name: 'twitter:description', content: description },
    { key: 'twitter:image', name: 'twitter:image', content: imageUrl },
    { key: 'twitter:title', name: 'twitter:title', content: title },
    { key: 'twitter:url', name: 'twitter:url', content: canonicalUrl },
  ];

  // LINKS
  const linkTags = [
    // canonical link
    {
      key: 'canonical',
      href: canonicalUrl,
      rel: 'canonical',
    },

    // add rss feed
    {
      key: 'rss-feed',
      href: asPath?.includes('/de/') ? '/rss_de.xml' : '/rss_en.xml',
      rel: 'alternate',
      title: 'RSS Feed for storyliner.app',
      type: 'application/rss+xml',
    },

    // add sitemap
    {
      key: 'sitemap',
      href: '/sitemap.xml',
      rel: 'sitemap',
      type: 'application/xml',
    },
  ];

  // SCRIPTS
  const jsonLD: {
    '@content'?: string;
    '@type'?: string;
    name?: string;
    publisher?: string;
    url?: string;
  } = {};
  jsonLD['@content'] = 'https://schema.org/';
  jsonLD['@type'] = 'WebPage';
  jsonLD.name = title;
  jsonLD.url = canonicalUrl;
  jsonLD.publisher = 'Michael Schmitt';
  const scriptTags = [
    { key: 'jsonLD', id: 'jsonLD', type: 'application/ld+json', innerHTML: JSON.stringify(jsonLD) },
  ];

  // set head via Helmet
  return (
    <>
      <Head>
        <title>{brandedTitle}</title>
        {linkTags.map(({ key, ...linkTag }) => (
          <link key={key} {...linkTag} />
        ))}
        {metaTags.map(({ key, ...metaTag }) => (
          <meta key={key} {...metaTag} />
        ))}
      </Head>

      {scriptTags.map(({ key, ...scriptTag }) => (
        <Script
          dangerouslySetInnerHTML={{ __html: scriptTag.innerHTML }}
          id={scriptTag.id}
          key={key}
          type={scriptTag.type}
        />
      ))}
    </>
  );
};

SEO.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SEO;
