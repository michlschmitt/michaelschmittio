// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import styles
import styles from './TestimonialCard.module.css';
import Image from '../atoms/Image';

// define component
const TestimonialCard: React.FunctionComponent<{
  image: string;
  name: string;
  quote: string;
  designation: string;
}> = ({ image, name, quote, designation }) => (
  <div className={styles.card}>
    <blockquote className={styles.quote}>„{quote}“</blockquote>
    <div className={styles.testimonal}>
      <div className={styles.imageContainer}>
        <Image alt={name} height={240} isRound layout="responsive" src={image} width={240} />
      </div>
      <div className={styles.nameContainer}>
        <div className={styles.name}>{name}</div>
        <div className={styles.designation}>{designation}</div>
      </div>
    </div>
  </div>
);

TestimonialCard.propTypes = {
  designation: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

export default TestimonialCard;
