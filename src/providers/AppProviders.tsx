// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';

// import Providers
import AnalyticsProvider from './AnalyticsProvider';
import NProgressProvider from './NProgressProvider';
import YoutubePrivacyProvider from './YoutubePrivacyProvider';
import PlausibleProvider from './PlausibleProvider';

// NOTE: order matters!

// AppProviders component
const AppProviders: React.FunctionComponent = ({ children }) => (
  <AnalyticsProvider>
    <PlausibleProvider>
      <NProgressProvider>
        <YoutubePrivacyProvider>{children}</YoutubePrivacyProvider>
      </NProgressProvider>
    </PlausibleProvider>
  </AnalyticsProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
