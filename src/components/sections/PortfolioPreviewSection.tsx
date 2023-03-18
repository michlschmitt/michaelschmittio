import * as PropTypes from 'prop-types';
import React from 'react';

import {
  ButtonColor,
  PortfolioPreviewSectionImagePosition,
  PortfolioPreviewSectionImagePositionEnum,
  SectionColorEnum,
  SectionColorType,
} from '../../types';

import styles from './PortfolioPreviewSection.module.css';

import Container from '../layouts/Container';
import Heading from '../atoms/Heading';
import Image from '../atoms/Image';
import LinkButton from '../atoms/LinkButton';
import Section from '../layouts/Section';
import Spacer from '../layouts/Spacer';
import Subtitle from '../atoms/Subtitle';
import Text from '../atoms/Text';

const PortfolioPreviewSection: React.FunctionComponent<{
  backgroundColor?: SectionColorType;
  buttons: { href: string; color: string; label: string }[];
  facts?: { text: string }[];
  image: string;
  imagePosition?: PortfolioPreviewSectionImagePosition;
  introText: string;
  subline: string;
  title: string;
}> = ({ backgroundColor, buttons, facts, image, imagePosition, introText, subline, title }) => {
  // image left
  if (imagePosition === 'left') {
    return (
      <Section color={backgroundColor}>
        <Container xl>
          <div className={styles.previewGrid}>
            <div className={styles.leftImageContainer}>
              <div className={styles.leftImageCard}>
                <Image
                  alt={subline}
                  className={styles.leftImage}
                  height={800}
                  layout="responsive"
                  src={image}
                  width={1280}
                />
              </div>
            </div>
            <div className={styles.leftComponent}>
              <div className={styles.content}>
                <Subtitle>{subline}</Subtitle>
                <Spacer height="6px" />
                <Heading tag="h2">{title}</Heading>
                <Text>{introText}</Text>
              </div>

              {facts && (
                <ul className={styles.facts}>
                  {facts.map((fact: { text: string }) => (
                    <li className={styles.fact} key={fact.text}>
                      <Text customClasses="!mb-0">{fact.text}</Text>
                    </li>
                  ))}
                </ul>
              )}

              <div className={styles.buttons}>
                {buttons.map((button) => (
                  <LinkButton
                    color={button.color as ButtonColor}
                    customClasses={styles.button}
                    href={button.href}
                    key={button.href}
                    text={button.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // image right
  if (imagePosition === 'right') {
    return (
      <Section color={backgroundColor}>
        <Container xl>
          <div className={styles.previewGrid}>
            <div className={styles.rightComponent}>
              <div className={styles.content}>
                <Subtitle>{subline}</Subtitle>
                <Spacer height="6px" />
                <Heading tag="h2">{title}</Heading>
                <Text>{introText}</Text>
              </div>

              {facts && (
                <ul className={styles.facts}>
                  {facts.map((fact: { text: string }) => (
                    <li className={styles.fact} key={fact.text}>
                      <Text customClasses="!mb-0">{fact.text}</Text>
                    </li>
                  ))}
                </ul>
              )}

              <div className={styles.buttons}>
                {buttons.map((button) => (
                  <LinkButton
                    color={button.color as ButtonColor}
                    customClasses={styles.button}
                    href={button.href}
                    key={button.href}
                    text={button.label}
                  />
                ))}
              </div>
            </div>
            <div className={styles.rightImageContainer}>
              <div className={styles.rightImageCard}>
                <Image
                  alt={subline}
                  className={styles.rightImage}
                  height={800}
                  layout="responsive"
                  src={image}
                  width={1280}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // invalid image position
  throw new Error('Invalid image position');
};

PortfolioPreviewSection.defaultProps = {
  backgroundColor: 'black',
  facts: undefined,
  imagePosition: 'right',
};

PortfolioPreviewSection.propTypes = {
  backgroundColor: PropTypes.oneOf(Object.values(SectionColorEnum)),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  facts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  ),
  image: PropTypes.string.isRequired,
  imagePosition: PropTypes.oneOf(Object.values(PortfolioPreviewSectionImagePositionEnum)),
  introText: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PortfolioPreviewSection;
