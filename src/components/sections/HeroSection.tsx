// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import NextImage from 'next/image';

// import types
import { ButtonColor } from '../../types';

// import components
import Container from '../layouts/Container';
import Heading from '../atoms/Heading';
import LinkButton from '../atoms/LinkButton';
import Text from '../atoms/Text';

// import styles
import styles from './HeroSection.module.css';

// define component
const HeroSection: React.FunctionComponent<{
  buttons: { color: string; href: string; label: string }[];
  heroImage: string;
  introText: string;
  title: string;
}> = ({ buttons, heroImage, introText, title }) => (
  <div className={styles.section}>
    <Container>
      <div className={styles.heroSectionGrid}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <Heading tag="h1">{title}</Heading>
            <Text size="large">{introText}</Text>
          </div>

          <div className={styles.buttonsContainer}>
            {buttons.map((button) => (
              <LinkButton
                color={button.color as ButtonColor}
                customClasses={styles.button}
                href={button.href}
                key={button.href}
                size="large"
                text={button.label}
              />
            ))}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageCard}>
            <NextImage
              className={styles.image}
              height={800}
              layout="responsive"
              src={heroImage}
              width={680}
            />
          </div>

          {/* Grid */}
          <div className={styles.sheetLine1} />
          <div className={styles.sheetLine2} />
          <div className={styles.sheetLine3} />
          <div className={styles.sheetLine4} />
          <div className={styles.sheetLine5} />
          <div className={styles.sheetLine6} />
        </div>
      </div>
    </Container>
  </div>
);

HeroSection.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  heroImage: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeroSection;
