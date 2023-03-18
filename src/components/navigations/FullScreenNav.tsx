import React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'next/link';

import { MainNavType } from '../../types';

import LinkButton from '../atoms/LinkButton';
import CloseMenuIcon from '../svgs/CloseMenuIcon';

import { mainNavPropTypes } from '../../modules/prop-types';

import styles from './FullScreenNav.module.css';

const FullScreenNav: React.FunctionComponent<{ content: MainNavType; closeMenu: () => void }> = ({
  closeMenu,
  content,
}) => (
  <div className={styles.fullscreenNav}>
    {/* Close */}
    <div className={styles.closeButtonContainer}>
      <button className={styles.closeButton} onClick={closeMenu} type="button">
        <CloseMenuIcon />
      </button>
    </div>

    {/* Logo */}
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <Link href={content.logo.href} passHref className={styles.logoLink}>
          {content.logo.label}
        </Link>
      </li>
    </ul>

    {/* Links */}
    <ul className={styles.menu}>
      {content.navItems.map((navItem) => (
        <li className={styles.menuItem} key={navItem.href}>
          <Link href={navItem.href} passHref className={styles.link}>
            {navItem.label}
          </Link>
        </li>
      ))}
    </ul>

    {/* Social media links */}
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <a
          className={styles.link}
          href={content.socialLinks.linkedIn.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content.socialLinks.linkedIn.label}
        </a>
      </li>

      <li className={styles.menuItem}>
        <a
          className={styles.link}
          href={content.socialLinks.twitter.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content.socialLinks.twitter.label}
        </a>
      </li>
    </ul>

    {/* Call to action */}
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <LinkButton
          color="gradient"
          href={content.callToAction.href}
          size="medium"
          text={content.callToAction.label}
        />
      </li>
    </ul>
  </div>
);

FullScreenNav.propTypes = {
  content: mainNavPropTypes,
  closeMenu: PropTypes.func.isRequired,
};

export default FullScreenNav;
