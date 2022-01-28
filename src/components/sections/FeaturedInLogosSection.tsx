// import node_modules
import * as React from 'react';
import NextImage from 'next/image';

// import types
import { FeaturedInLogoSectionType } from '../../types';

// import modules
import { featuredInLogoSectionPropTypes } from '../../modules/prop-types';

// import styles
import styles from './FeaturedInLogosSection.module.css';

// define components
const FeaturedInLogosSection: React.FunctionComponent<{ content: FeaturedInLogoSectionType }> = ({
  content,
}) => (
  <div className={styles.section}>
    <div className={styles.title}>{content.title}</div>
    {content.logos.map((logo) => (
      <div className={styles.logoContainer} key={logo.src}>
        <NextImage
          alt={logo.alt}
          className={styles.logo}
          height={360}
          layout="responsive"
          src={logo.src}
          title={logo.alt}
          width={720}
        />
      </div>
    ))}
  </div>
);

FeaturedInLogosSection.propTypes = {
  content: featuredInLogoSectionPropTypes,
};

export default FeaturedInLogosSection;
