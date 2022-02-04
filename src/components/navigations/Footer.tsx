// import node_modules
import * as React from 'react';
import Link from 'next/link';

// import types
import { FooterType } from '../../types';

// import modules
import { footerPropTypes } from '../../modules/prop-types';

// import components
import GithubIcon from '../svgs/GithubIcon';
import LinkedInIcon from '../svgs/LinkedInIcon';
import TwitterIcon from '../svgs/TwitterIcon';

// import styles
import styles from './Footer.module.css';

// define component
const Footer: React.FunctionComponent<{ content: FooterType }> = ({ content }) => (
  <nav className={styles.footer}>
    <div className={styles.container}>
      <ul className={styles.copyrightMenu}>
        <li className={styles.copyrightMenuItem}>
          <Link href={content.copyright.href} passHref>
            <a className={styles.link}>{content.copyright.label}</a>
          </Link>
        </li>
      </ul>

      <ul className={styles.linksMenu}>
        {content.links.map((link) => (
          <li className={styles.linksMenuItem} key={link.label}>
            <Link href={link.href} passHref>
              <a className={styles.link}>{link.label}</a>
            </Link>
          </li>
        ))}

        <li className={styles.linksMenuItem}>
          <button
            className={styles.link}
            onClick={() =>
              (
                window as unknown as { cookiehub: { openSettings: () => void } }
              ).cookiehub.openSettings()
            }
          >
            {content.cookiePolicy.label}
          </button>
        </li>
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
