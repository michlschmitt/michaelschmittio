import React from 'react';
import Link from 'next/link';

import { FooterType } from '../../types';

import { footerPropTypes } from '../../modules/prop-types';

import GithubIcon from '../svgs/GithubIcon';
import LinkedInIcon from '../svgs/LinkedInIcon';
import TwitterIcon from '../svgs/TwitterIcon';

import styles from './Footer.module.css';

const Footer: React.FunctionComponent<{ content: FooterType }> = ({ content }) => (
  <nav className={styles.footer}>
    <div className={styles.container}>
      <ul className={styles.copyrightMenu}>
        <li className={styles.copyrightMenuItem}>
          <Link href={content.copyright.href} passHref className={styles.link}>
            {content.copyright.label}
          </Link>
        </li>
      </ul>

      <ul className={styles.linksMenu}>
        {content.links.map((link) => (
          <li className={styles.linksMenuItem} key={link.label}>
            <Link href={link.href} passHref className={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className={styles.socialMenu}>
        <li className={styles.socialMenuItem}>
          <a
            className={styles.link}
            href={content.socialLinks.github.href}
            rel="noopener noreferrer"
            target="_blank"
            title={content.socialLinks.github.label}
          >
            <GithubIcon />
          </a>
        </li>

        <li className={styles.socialMenuItem}>
          <a
            className={styles.link}
            href={content.socialLinks.linkedIn.href}
            rel="noopener noreferrer"
            target="_blank"
            title={content.socialLinks.linkedIn.label}
          >
            <LinkedInIcon />
          </a>
        </li>
        <li className={styles.socialMenuItem}>
          <a
            className={styles.link}
            href={content.socialLinks.twitter.href}
            rel="noopener noreferrer"
            target="_blank"
            title={content.socialLinks.twitter.label}
          >
            <TwitterIcon />
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

Footer.propTypes = {
  content: footerPropTypes,
};

export default Footer;
