import * as PropTypes from 'prop-types';
import React from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

const NProgressProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const onRouteChangeStart = React.useCallback(() => {
    NProgress.start();
  }, []);

  const onRouteChangeComplete = React.useCallback(() => {
    NProgress.done();
  }, []);

  React.useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  React.useEffect(() => {
    // listen to route changes
    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [onRouteChangeStart, onRouteChangeComplete, router]);

  return <>{children}</>;
};

NProgressProvider.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default NProgressProvider;
