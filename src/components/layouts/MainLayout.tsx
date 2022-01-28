// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';

// import types
import { FooterType, MainNavType } from '../../types';

// import modules
import { footerPropTypes, mainNavPropTypes } from '../../modules/prop-types';

// import components
import MainNav from '../navigations/MainNav';
import Footer from '../navigations/Footer';

// import styles
import styles from './MainLayout.module.css';

// define component
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
  children: PropTypes.node.isRequired,
  content: PropTypes.shape({
    MainNav: mainNavPropTypes,
    Footer: footerPropTypes,
  }).isRequired,
};

export default MainLayout;
