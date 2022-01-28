// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import styles
import styles from './TextWall.module.css';

// define component
const TextWall: React.FunctionComponent<{ title: string; text: string }> = ({ title, text }) => (
  <div className={styles.wall}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.text}>{text}</p>
  </div>
);

TextWall.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextWall;
