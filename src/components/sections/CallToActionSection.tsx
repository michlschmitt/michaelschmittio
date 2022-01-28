// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';

// import components
import Heading from '../atoms/Heading';
import LinkButton from '../atoms/LinkButton';
import Text from '../atoms/Text';

// import styles
import styles from './CallToActionSection.module.css';

// define component
const CallToActionSection: React.FunctionComponent<{
  ctaHref: string;
  ctaLabel: string;
  teaser: string;
  title: string;
}> = ({ ctaHref, ctaLabel, title, teaser }) => (
  <div className={styles.section}>
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading alignment="center" tag="h2">
          {title}
        </Heading>
        <Text alignment="center">{teaser}</Text>
      </div>
      <div className={styles.cta}>
        <LinkButton color="gradient" href={ctaHref} size="large" text={ctaLabel} />
      </div>
    </div>
  </div>
);

CallToActionSection.propTypes = {
  ctaHref: PropTypes.string.isRequired,
  ctaLabel: PropTypes.string.isRequired,
  teaser: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CallToActionSection;
