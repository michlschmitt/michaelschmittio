// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import components
import Heading from '../atoms/Heading';
import Image from '../atoms/Image';
import Spacer from '../layouts/Spacer';
import Subtitle from '../atoms/Subtitle';
import Text from '../atoms/Text';

// import styles
import styles from './PortfolioItemCard.module.css';
import Link from 'next/link';

// define component
const PortfolioItemCard: React.FunctionComponent<{
  image: string;
  linkLabel: string;
  name: string;
  slug: string;
  text: string;
  title: string;
}> = ({ linkLabel, image, name, slug, text, title }) => (
  <div className={styles.cardContainer}>
    <Link href={`/portfolio/${slug}/`}>
      <a className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            // height={1280}
            // width={720}
            alt={name}
            className={styles.image}
            layout="fill"
            src={image}
          />
        </div>
        <div className={styles.contentContainer}>
          <Spacer height="8px" />
          <Subtitle>{name}</Subtitle>
          <Spacer height="8px" />
          <Heading customClasses={styles.heading} tag="h3">
            {title}
          </Heading>
          <Text customClasses={styles.text}>{text}</Text>
        </div>
        <Spacer height="16px" />
        <div className={styles.buttonContainer}>
          <div className={styles.button}>{linkLabel}</div>
        </div>
      </a>
    </Link>
  </div>
);

PortfolioItemCard.propTypes = {
  image: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PortfolioItemCard;
