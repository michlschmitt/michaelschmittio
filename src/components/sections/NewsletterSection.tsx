// import node_modules
import * as React from 'react';

// import types
import { NewsletterSectionType } from '../../types';

// import components
import Heading from '../atoms/Heading';
import RevueForm from '../vendors/RevueForm';
import Text from '../atoms/Text';

// import modules
import { newsletterSectionPropTypes } from '../../modules/prop-types';

// import styles
import styles from './NewsletterSection.module.css';

// define component
const NewsletterSection: React.FunctionComponent<{ content: NewsletterSectionType }> = ({
  content,
}) => (
  <div className={styles.section}>
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading alignment="center" tag="h2">
          {content.title}
        </Heading>
        <Text alignment="center">{content.teaser}</Text>
      </div>
      <div className={styles.newsletter}>
        <RevueForm alignment="center" content={content.RevueForm} />
      </div>
    </div>
  </div>
);

NewsletterSection.propTypes = {
  content: newsletterSectionPropTypes,
};

export default NewsletterSection;
