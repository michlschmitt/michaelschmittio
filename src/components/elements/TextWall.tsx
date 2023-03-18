import React from 'react';
import * as PropTypes from 'prop-types';

import Spacer from '../layouts/Spacer';

import styles from './TextWall.module.css';

const TextWall: React.FunctionComponent<{ title: string; text: string }> = ({ title, text }) => (
  <div className={styles.wall}>
    <h2 className={styles.title}>{title}</h2>
    <Spacer height="12px" />
    <p className={styles.text}>{text}</p>
  </div>
);

TextWall.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextWall;
