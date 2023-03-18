import React from 'react';
import * as PropTypes from 'prop-types';

import styles from './TimelineContainer.module.css';

const TimelineContainer: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className={styles.container}>
    <div className={styles.timeline}>{children}</div>
  </div>
);

TimelineContainer.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default TimelineContainer;
