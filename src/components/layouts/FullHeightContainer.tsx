// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import styles
import styles from './FullHeightContainer.module.css';

// define component
const FullHeightContainer: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.container}>{children}</div>;

FullHeightContainer.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default FullHeightContainer;
