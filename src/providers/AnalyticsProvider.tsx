/* eslint-disable @typescript-eslint/ban-ts-comment */

// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';

// component for updating dataLayer
const AnalyticsProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  // init hooks
  const router = useRouter();

  // handle data changes
  React.useEffect(() => {
    // init google tag manager
    if (process.env.NODE_ENV === 'production') {
      if (typeof window !== 'undefined') {
        const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
        if (typeof gtmId === 'string') {
          TagManager.initialize({ gtmId });
        }
      }
    }

    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined') {
        // Update google tag manager dataLayer on page load
        // @ts-ignore
        const dataLayer = window?.dataLayer || [];
        setTimeout(() => {
          dataLayer.push({
            event: 'VirtualPageview',
            virtualPageURL: url,
            virtualPageTitle: document.title,
          });
        }, 200);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <>{children}</>;
};

AnalyticsProvider.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default AnalyticsProvider;
