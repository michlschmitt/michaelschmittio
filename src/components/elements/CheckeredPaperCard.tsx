import * as PropTypes from 'prop-types';
import React from 'react';

import styles from './CheckeredPaperCard.module.css';

const CheckeredPaperCard: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className={styles.container}>
    <div className={styles.cardContainer}>
      {/* Component */}
      <div className={styles.card}>{children}</div>

      {/* Checkered paper grid */}
      <div className={styles.sheetLine1} />
      <div className={styles.sheetLine2} />
      <div className={styles.sheetLine3} />
      <div className={styles.sheetLine4} />
      <div className={styles.sheetLine5} />
      <div className={styles.sheetLine6} />
    </div>
  </div>
);

CheckeredPaperCard.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default CheckeredPaperCard;
