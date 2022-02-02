// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import components
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

// import styles
import styles from './TimelineCard.module.css';

// define component
const TimelineCard: React.FunctionComponent<{ title: string; text: string }> = ({
  title,
  text,
}) => (
  <div className={styles.card}>
    <Heading isBlack tag="h3">
      {title}
    </Heading>
    <Text customClasses="!mb-0" isBlack>
      {text}
    </Text>
  </div>
);

TimelineCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TimelineCard;
