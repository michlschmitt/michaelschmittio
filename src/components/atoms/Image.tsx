// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import NextImage from 'next/image';
import cn from 'classnames';

// import styles
import styles from './Image.module.css';

// define component
const Image: React.FunctionComponent<{
  alt: string;
  height: number;
  isPriority?: boolean;
  isRound?: boolean;
  isWhite?: boolean;
  layout?: 'responsive';
  src: string;
  width: number;
}> = ({ alt, height, layout, isPriority, isRound, isWhite, src, width }) => {
  // init styles
  const imageStyles = React.useMemo(
    () => cn(styles.image, { [styles.imageIsRound]: isRound, [styles.imageIsWhite]: isWhite }),
    [isRound, isWhite],
  );

  // NOTE: this is since next export does not support automated image optimization
  const loader =
    process.env.VERCEL === '1' || process.env.NODE_ENV === 'development'
      ? undefined
      : { loader: () => src };

  // render
  return (
    <NextImage
      alt={alt}
      className={imageStyles}
      height={height}
      layout={layout}
      priority={isPriority}
      src={src}
      width={width}
      {...loader}
    />
  );
};

Image.defaultProps = {
  isPriority: false,
  isRound: false,
  isWhite: false,
  layout: 'responsive',
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  isPriority: PropTypes.bool,
  isRound: PropTypes.bool,
  isWhite: PropTypes.bool,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default Image;
