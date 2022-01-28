// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Script from 'next/script';

// PlausibleProvider component
// https://plausible.io/docs/proxy/guides/nextjs
const PlausibleProvider: React.FunctionComponent = ({ children }) => {
  // init render
  return (
    <>
      <Script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="/js/script.js" />
      <>{children}</>
    </>
  );
};

PlausibleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlausibleProvider;
