// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';

// import Providers
import AnalyticsProvider from './AnalyticsProvider';
import NProgressProvider from './NProgressProvider';
import PasswordProtectionProvider from './PasswordProtectionProvider';
import PlausibleProvider from './PlausibleProvider';
import YoutubePrivacyProvider from './YoutubePrivacyProvider';

// NOTE: order matters!

// AppProviders component
const AppProviders: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
  <PasswordProtectionProvider>
    <AnalyticsProvider>
      <PlausibleProvider>
        <NProgressProvider>
          <YoutubePrivacyProvider>{children}</YoutubePrivacyProvider>
        </NProgressProvider>
      </PlausibleProvider>
    </AnalyticsProvider>
  </PasswordProtectionProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default AppProviders;
