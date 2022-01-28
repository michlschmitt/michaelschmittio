// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import NextImage from 'next/image';
import cn from 'classnames';

// import types
import {
  ButtonColor,
  PortfolioPreviewSectionColor,
  PortfolioPreviewSectionColorEnum,
  PortfolioPreviewSectionImagePosition,
  PortfolioPreviewSectionImagePositionEnum,
} from '../../types';

// import styles
import styles from './PortfolioPreviewSection.module.css';

// import components
import Container from '../layouts/Container';
import Heading from '../atoms/Heading';
import LinkButton from '../atoms/LinkButton';
import Text from '../atoms/Text';

// define component
const PortfolioPreviewSection: React.FunctionComponent<{
  backgroundColor?: PortfolioPreviewSectionColor;
  buttons: { href: string; color: string; label: string }[];
  facts?: { text: string }[];
  image: string;
  imagePosition?: PortfolioPreviewSectionImagePosition;
  introText: string;
  subline: string;
  title: string;
}> = ({ backgroundColor, buttons, facts, image, imagePosition, introText, subline, title }) => {
  // init styles
  const sectionStyles = React.useMemo(
    () =>
      cn(styles.section, {
        [styles.sectionIsBlack]: backgroundColor === 'black',
        [styles.sectionIsGradient]: backgroundColor === 'gradient',
      }),
    [backgroundColor],
  );

  // image left
  if (imagePosition === 'left') {
    return (
      <div className={sectionStyles}>
        <Container>
          <div className={styles.previewGrid}>
            <div className={styles.leftImageContainer}>
              <div className={styles.leftImageCard}>
                <NextImage
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
                <div className={styles.subline}>{subline}</div>
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
      </div>
    );
  }

  // image right
  if (imagePosition === 'right') {
    return (
      <div className={sectionStyles}>
        <Container>
          <div className={styles.previewGrid}>
            <div className={styles.rightComponent}>
              <div className={styles.content}>
                <div className={styles.subline}>{subline}</div>
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
                <NextImage
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
      </div>
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
  backgroundColor: PropTypes.oneOf(Object.values(PortfolioPreviewSectionColorEnum)),
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
