// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import styles
import styles from './FullHeightContainer.module.css';

// define component
const FullHeightContainer: React.FunctionComponent = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

FullHeightContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FullHeightContainer;
