// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import styles
import styles from './Subtitle.module.css';

// define component
const Subtitle: React.FunctionComponent = ({ children }) => (
  <div className={styles.subtitle}>{children}</div>
);

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Subtitle;
