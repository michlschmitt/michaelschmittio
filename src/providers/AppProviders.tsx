import * as PropTypes from 'prop-types';
import React from 'react';

import NProgressProvider from './NProgressProvider';
import PasswordProtectionProvider from './PasswordProtectionProvider';
import PlausibleProvider from './PlausibleProvider';
import YoutubePrivacyProvider from './YoutubePrivacyProvider';

// NOTE: order matters!

const AppProviders: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
  <PasswordProtectionProvider>
    <PlausibleProvider>
      <NProgressProvider>
        <YoutubePrivacyProvider>{children}</YoutubePrivacyProvider>
      </NProgressProvider>
    </PlausibleProvider>
  </PasswordProtectionProvider>
);

AppProviders.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default AppProviders;
