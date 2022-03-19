// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

// import components
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

// import styles
import styles from './TimelineCard.module.css';

// define component
const TimelineCard: React.FunctionComponent<{ company: string; title: string; text: string }> = ({
  company,
  text,
  title,
}) => {
  // init states
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  // render collabsible
  return (
    <div className={styles.card}>
      <div className="relative pr-8">
        <Heading customClasses="!mb-0" isBlack tag="h3">
          {title}
        </Heading>
        <Text customClasses="!mb-0 text-primary" size="small" isBlack>
          {company}
        </Text>
        <div className="absolute right-0 top-[50%] mt-[-22px]">
          <Button
            color="naked"
            customClasses="!leading-none !tracking-none !text-black pt-[10px]"
            onClick={() => setIsExpanded(!isExpanded)}
            size="medium"
            text={isExpanded ? '↑' : '↓'}
          />
        </div>
      </div>
      <div
        className={classNames('mt-3', { 'flex animate-fade-in': isExpanded, hidden: !isExpanded })}
      >
        <Text isBlack>{text}</Text>
      </div>
    </div>
  );
};

TimelineCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TimelineCard;
