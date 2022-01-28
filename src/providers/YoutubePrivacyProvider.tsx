// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import modules
import { iframeOptin } from '../modules/notion/privacy';

// YoutubePrivacyProvider component
// https://support.cookiehub.com/article/75-youtube-embed-videos
const YoutubePrivacyProvider: React.FunctionComponent = ({ children }) => {
  // handle data changes
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

  // init render
  return <>{children}</>;
};

YoutubePrivacyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default YoutubePrivacyProvider;
