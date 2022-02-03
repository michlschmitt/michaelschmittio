/* eslint-disable no-alert */

// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

// define component
const PasswordProtection: React.FunctionComponent = ({ children }) => {
  // init hooks
  const [, setCookie] = useCookies(['passwordProtection']);

  // init states
  const [hasAccess, updateAccess] = React.useState<boolean>(false);

  // show alert on render
  React.useEffect(() => {
    // ask for password
    const password = prompt('Open sesame:', '');
    if (password === process.env.NEXT_PUBLIC_PASSWORD_PROTECTION) {
      updateAccess(true);
      setCookie('passwordProtection', 'true', {
        path: '/',
        domain: process.env.NEXT_PUBLIC_COOKIES_BASE_DOMAIN,
        sameSite: 'lax',
        secure: process.env.VERCEL === '1',
      });
    } else {
      updateAccess(false);
    }
  }, [setCookie, updateAccess]);

  // render website
  if (hasAccess) {
    return <>{children}</>;
  }

  // passwordProtected
  return <></>;
};

PasswordProtection.propTypes = {
  children: PropTypes.node.isRequired,
};

// PasswordProtectionProvider component
const PasswordProtectionProvider: React.FunctionComponent = ({ children }) => {
  // init hooks
  const [cookies] = useCookies(['passwordProtection']);

  // pw already entered
  if (cookies?.passwordProtection === 'true') {
    return <>{children}</>;
  }

  // has password protection on
  if (process.env.NEXT_PUBLIC_PASSWORD_PROTECTION) {
    return <PasswordProtection>{children}</PasswordProtection>;
  }

  // render website
  return <>{children}</>;
};

PasswordProtectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PasswordProtectionProvider;
