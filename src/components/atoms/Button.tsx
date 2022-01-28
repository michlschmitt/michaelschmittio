// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import cn from 'classnames';

// import types
import {
  ButtonColor,
  ButtonColorEnum,
  ButtonSize,
  ButtonSizeEnum,
  ButtonType,
  ButtonTypeEnum,
} from '../../types';

// import styles
import styles from './Button.module.css';

// define components
const Button: React.FunctionComponent<{
  customClasses?: string;
  id?: string;
  color?: ButtonColor;
  name?: string;
  size?: ButtonSize;
  text: string;
  type?: ButtonType;
}> = ({ customClasses, id, color, name, size, text, type }) => {
  // init styles
  const buttonClasses = React.useMemo(
    () =>
      cn(
        styles.button,
        {
          [styles.buttonIsGradient]: color === 'gradient',
          [styles.buttonIsNaked]: color === 'naked',
          [styles.buttonIsSmall]: size === 'small',
          [styles.buttonIsMedium]: size === 'medium',
          [styles.buttonIsLarge]: size === 'large',
        },
        customClasses,
      ),
    [customClasses, color, size],
  );

  // has label
  if (type === 'submit') {
    return <input className={buttonClasses} id={id} name={name} type="submit" value={text} />;
  }

  return (
    <button className={buttonClasses} id={id} type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'gradient',
  id: undefined,
  name: undefined,
  type: 'button',
};

Button.propTypes = {
  color: PropTypes.oneOf(Object.values(ButtonColorEnum)),
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(Object.values(ButtonSizeEnum)),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ButtonTypeEnum)),
};

export default Button;
