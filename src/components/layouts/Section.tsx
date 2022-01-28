// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import components
import Container from './Container';

// import styles
import styles from './Section.module.css';

// define component
const Section: React.FunctionComponent = ({ children }) => (
  <div className={styles.section}>
    <Container>{children}</Container>
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
