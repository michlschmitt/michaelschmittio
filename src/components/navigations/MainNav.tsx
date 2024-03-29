import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainNavType } from '../../types';

import Container from '../layouts/Container';
import GithubIcon from '../svgs/GithubIcon';
import LinkButton from '../atoms/LinkButton';
import LinkedInIcon from '../svgs/LinkedInIcon';
import MobileMenuIcon from '../svgs/MobileMenuIcon';
import TwitterIcon from '../svgs/TwitterIcon';

import { mainNavPropTypes } from '../../modules/prop-types';

import styles from './MainNav.module.css';

const FullScreenNav = dynamic(() => import('./FullScreenNav'));

const MainNav: React.FunctionComponent<{ content: MainNavType }> = ({ content }) => {
  const router = useRouter();
  const [mobileMenuState, setMobileMenuState] = React.useState<boolean>(false);

  const onToggleMobileMenu = React.useCallback(() => {
    setMobileMenuState(!mobileMenuState);
  }, [mobileMenuState]);

  const onCloseMobileMenu = React.useCallback(() => {
    setMobileMenuState(false);
  }, []);

  React.useEffect(() => {
    // close mobile menu
    router.events.on('routeChangeStart', onCloseMobileMenu);

    // unsubscribe on unmount
    return () => {
      router.events.off('routeChangeStart', onCloseMobileMenu);
    };
  }, [onCloseMobileMenu, router]);

  return (
    <>
      <nav className={styles.mainNav}>
        <Container>
          <div className={styles.container}>
            {/* Logo */}
            <ul className={styles.logoMenu}>
              <li className={styles.logoMenuItem}>
                <Link href={content.logo.href} passHref className={styles.logoLink}>
                  {content.logo.label}
                </Link>
              </li>
            </ul>

            {/* Links */}
            <ul className={styles.linksMenu}>
              {content.navItems.map((navItem) => (
                <li className={styles.linksMenuItem} key={navItem.href}>
                  <Link href={navItem.href} className={styles.link}>
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Call to action */}
            <ul className={styles.ctaMenu}>
              <li className={styles.ctaMenuItem}>
                <LinkButton
                  color="gradient"
                  href={content.callToAction.href}
                  size="small"
                  text={content.callToAction.label}
                />
              </li>
              <li className={styles.ctaMenuItem}>
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
              <li className={styles.ctaMenuItem}>
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
              <li className={styles.ctaMenuItem}>
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

            {/* Mobile button */}
            <ul className={styles.mobileButtonMenu}>
              <li className={styles.mobileButtonMenuItem}>
                <LinkButton
                  color="gradient"
                  href={content.callToAction.href}
                  size="small"
                  text={content.callToAction.label}
                />
              </li>

              <li className={styles.mobileButtonMenuItem}>
                <button
                  className={styles.mobileButtonMenuLink}
                  onClick={onToggleMobileMenu}
                  type="button"
                >
                  <MobileMenuIcon />
                </button>
              </li>
            </ul>
          </div>
        </Container>
      </nav>

      {/* Mobile menu */}
      {mobileMenuState && <FullScreenNav content={content} closeMenu={onCloseMobileMenu} />}
    </>
  );
};

MainNav.propTypes = {
  content: mainNavPropTypes,
};

export default MainNav;
