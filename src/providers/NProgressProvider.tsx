// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

// NProgressProvider component
const NProgressProvider: React.FunctionComponent = ({ children }) => {
  // init hooks
  const router = useRouter();

  // init func
  const onRouteChangeStart = React.useCallback(() => {
    NProgress.start();
  }, []);

  const onRouteChangeComplete = React.useCallback(() => {
    NProgress.done();
  }, []);

  // handle data changes
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

  // init render
  return <>{children}</>;
};

NProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NProgressProvider;
