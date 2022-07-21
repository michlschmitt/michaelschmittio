// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Script from 'next/script';

// import config
import { plausibleDomain } from '../../config';

// PlausibleProvider component
// https://plausible.io/docs/proxy/guides/nextjs
const PlausibleProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  // define methods
  const onOptOut = React.useCallback(() => {
    // set opt out flag
    localStorage.plausible_ignore = true;

    // reload page to activate flag
    window.location.reload();
  }, []);

  // listen to opt-out events
  React.useEffect(() => {
    // get plausible opt out button
    const button = document.getElementById('plausible-opt-out');

    // listen to click events
    if (button) {
      button.addEventListener('click', onOptOut);
      button.addEventListener('touchstart', onOptOut);
    }

    // return function to unlisten
    return () => {
      if (button) {
        button.removeEventListener('click', onOptOut);
        button.removeEventListener('touchstart', onOptOut);
      }
    };
  }, [onOptOut]);

  // init render
  return (
    <>
      <>{children}</>
      <Script defer data-domain={plausibleDomain} src="/js/script.js" />
    </>
  );
};

PlausibleProvider.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default PlausibleProvider;
