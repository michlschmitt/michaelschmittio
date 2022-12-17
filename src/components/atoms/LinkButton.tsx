// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Link from 'next/link';
import cn from 'classnames';

// import types
import { ButtonColor, ButtonColorEnum, ButtonSize, ButtonSizeEnum } from '../../types';

// import styles
import styles from './LinkButton.module.css';

// define components
const LinkButton: React.FunctionComponent<{
  color?: ButtonColor;
  customClasses?: string;
  href: string;
  size?: ButtonSize;
  text: string;
}> = ({ customClasses, color, href, size, text }) => {
  // init styles
  const buttonStyles = React.useMemo(
    () =>
      cn(
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
      ),
    [customClasses, color, size],
  );

  // has label
  if (href.includes('https') || href.includes('mailto')) {
    return (
      <a
        className={buttonStyles}
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
    <Link href={href} passHref className={buttonStyles}>
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
