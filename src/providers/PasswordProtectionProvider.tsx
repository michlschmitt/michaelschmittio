/* eslint-disable no-alert */

// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

// import config
import { cookieBaseDomain, passwordProtection } from '../../config';

// define component
const PasswordProtection: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  // init hooks
  const [, setCookie] = useCookies(['passwordProtection']);

  // init states
  const [hasAccess, updateAccess] = React.useState<boolean>(true);

  // show alert on render
  React.useEffect(() => {
    // ask for password
    const password = prompt('Open sesame:', '');
    if (password === passwordProtection) {
      updateAccess(true);
      setCookie('passwordProtection', 'true', {
        domain: cookieBaseDomain,
        path: '/',
        sameSite: 'lax',
        secure: process.env.VERCEL === '1',
      });
    } else {
      updateAccess(false);
    }
  }, [setCookie, updateAccess]);

  // render website
  if (!hasAccess) {
    return <></>;
  }

  // passwordProtected
  return <>{children}</>;
};

PasswordProtection.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

// PasswordProtectionProvider component
const PasswordProtectionProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  // init hooks
  const [cookies] = useCookies(['passwordProtection']);

  // pw already entered
  if (cookies?.passwordProtection === 'true') {
    return <>{children}</>;
  }

  // has password protection on
  if (passwordProtection) {
    return <PasswordProtection>{children}</PasswordProtection>;
  }

  // render website
  return <>{children}</>;
};

PasswordProtectionProvider.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default PasswordProtectionProvider;
