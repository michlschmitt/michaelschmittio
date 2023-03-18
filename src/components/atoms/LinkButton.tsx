import * as PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { ButtonColor, ButtonColorEnum, ButtonSize, ButtonSizeEnum } from '../../types';

import styles from './LinkButton.module.css';

const LinkButton: React.FunctionComponent<{
  color?: ButtonColor;
  customClasses?: string;
  href: string;
  size?: ButtonSize;
  text: string;
}> = ({ customClasses, color, href, size, text }) => {
  // has label
  if (href.includes('https') || href.includes('mailto')) {
    return (
      <a
        className={classNames(
          styles.button,
          {
            [styles.buttonIsGradient]: color === 'gradient',
            [styles.buttonIsNaked]: color === 'naked',
            [styles.buttonIsBlack]: color === 'black',
            [styles.buttonIsLink]: color === 'link',
            [styles.buttonIsSmall]: size === 'small',
            [styles.buttonIsMedium]: size === 'medium',
            [styles.buttonIsLarge]: size === 'large',
          },
          customClasses,
        )}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        title={text}
      >
        {text}
      </a>
    );
  }

  return (
    <Link
      href={href}
      passHref
      className={classNames(
        styles.button,
        {
          [styles.buttonIsGradient]: color === 'gradient',
          [styles.buttonIsNaked]: color === 'naked',
          [styles.buttonIsBlack]: color === 'black',
          [styles.buttonIsLink]: color === 'link',
          [styles.buttonIsSmall]: size === 'small',
          [styles.buttonIsMedium]: size === 'medium',
          [styles.buttonIsLarge]: size === 'large',
        },
        customClasses,
      )}
    >
      {text}
    </Link>
  );
};

LinkButton.defaultProps = {
  color: 'gradient',
  customClasses: undefined,
  size: 'medium',
};

LinkButton.propTypes = {
  color: PropTypes.oneOf(Object.values(ButtonColorEnum)),
  customClasses: PropTypes.string,
  href: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(ButtonSizeEnum)),
  text: PropTypes.string.isRequired,
};

export default LinkButton;
