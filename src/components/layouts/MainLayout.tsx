import * as PropTypes from 'prop-types';
import React from 'react';

import { FooterType, MainNavType } from '../../types';

import { footerPropTypes, mainNavPropTypes } from '../../modules/prop-types';

import MainNav from '../navigations/MainNav';
import Footer from '../navigations/Footer';

import styles from './MainLayout.module.css';

const MainLayout: React.FunctionComponent<{
  content: { MainNav: MainNavType; Footer: FooterType };
  children: React.ReactNode;
}> = ({ content, children }) => (
  <div className={styles.layout}>
    <header className={styles.header}>
      <MainNav content={content.MainNav} />
    </header>
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      <Footer content={content.Footer} />
    </footer>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  content: PropTypes.shape({
    MainNav: mainNavPropTypes,
    Footer: footerPropTypes,
  }).isRequired,
};

export default MainLayout;
