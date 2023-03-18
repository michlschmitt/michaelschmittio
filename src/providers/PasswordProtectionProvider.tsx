/* eslint-disable no-alert */

import React from 'react';
import * as PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import { cookieBaseDomain, passwordProtection } from '../../config';

const PasswordProtection: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [, setCookie] = useCookies(['passwordProtection']);
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

const PasswordProtectionProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cookies] = useCookies(['passwordProtection']);

  // pw already entered
  if (cookies?.passwordProtection === 'true') {
    return <>{children}</>;
  }

  // has password protection on
  if (passwordProtection) {
    return <PasswordProtection>{children}</PasswordProtection>;
  }

  return <>{children}</>;
};

PasswordProtectionProvider.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default PasswordProtectionProvider;
