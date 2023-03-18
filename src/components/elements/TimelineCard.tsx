import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

import styles from './TimelineCard.module.css';

const TimelineCard: React.FunctionComponent<{ company: string; title: string; text: string }> = ({
  company,
  text,
  title,
}) => {
  // init states
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  // render collabsible
  return (
    <div className={styles.cardContainer}>
      <button className={styles.card} onClick={() => setIsExpanded(!isExpanded)} role="button">
        <div className={styles.header}>
          <Heading customClasses={styles.headerTitle} isBlack tag="h3">
            {title}
          </Heading>
          <Text customClasses={styles.headerText} size="small" isBlack>
            {company}
          </Text>
          <div className={styles.headerIcon}>
            <span>{isExpanded ? '↑' : '↓'}</span>
          </div>
        </div>
        <div
          className={classNames(styles.content, {
            [styles.contentFadeIn]: isExpanded,
            [styles.contentHidden]: !isExpanded,
          })}
        >
          <Text isBlack>{text}</Text>
        </div>
      </button>
    </div>
  );
};

TimelineCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TimelineCard;
