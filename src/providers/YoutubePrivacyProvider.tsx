import React from 'react';
import * as PropTypes from 'prop-types';

import { iframeOptin } from '../modules/privacy';

const YoutubePrivacyProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const frames = document.getElementsByTagName('iframe');
      for (let i = 0; i < frames.length; i += 1) {
        frames[0].src = frames[0].src.replace(/www.youtube.com/gi, 'www.youtube-nocookie.com');
      }
    }
  }, []);

  // init iframe optin
  React.useEffect(() => {
    iframeOptin({ autoplay: false });
  }, []);

  return <>{children}</>;
};

YoutubePrivacyProvider.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default YoutubePrivacyProvider;
