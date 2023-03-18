import * as PropTypes from 'prop-types';
import React from 'react';
import NextImage from 'next/legacy/image';
import classNames from 'classnames';

import styles from './Image.module.css';

const Image: React.FunctionComponent<{
  alt: string;
  className?: string;
  height?: number;
  isPriority?: boolean;
  isRound?: boolean;
  isWhite?: boolean;
  layout?: 'responsive' | 'fill';
  src: string;
  width?: number;
}> = ({ alt, className, height, layout, isPriority, isRound, isWhite, src, width }) => {
  // NOTE: this is since next export does not support automated image optimization
  const isDevelopment = process.env.VERCEL === '1' || process.env.NODE_ENV === 'development';
  const loader = isDevelopment ? undefined : { loader: () => src };
  const loading = isPriority ? undefined : { loading: 'lazy' };

  return (
    <NextImage
      alt={alt}
      className={classNames(
        styles.image,
        { [styles.imageIsRound]: isRound, [styles.imageIsWhite]: isWhite },
        className,
      )}
      height={height}
      layout={layout}
      priority={isPriority}
      objectFit="cover"
      src={src}
      width={width}
      {...(loading as { loading: 'lazy' | 'eager' | undefined })}
      {...loader}
    />
  );
};

Image.defaultProps = {
  className: undefined,
  height: undefined,
  isPriority: false,
  isRound: false,
  isWhite: false,
  layout: 'responsive',
  width: undefined,
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number,
  isPriority: PropTypes.bool,
  isRound: PropTypes.bool,
  isWhite: PropTypes.bool,
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default Image;
