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
  color?: ButtonColor;
  customClasses?: string;
  form?: string;
  id?: string;
  name?: string;
  size?: ButtonSize;
  text: string;
  type?: ButtonType;
}> = ({ color, customClasses, form, id, name, size, text, type }) => {
  // init styles
  const buttonClasses = React.useMemo(
    () =>
      cn(
        styles.button,
        {
          [styles.buttonIsGradient]: color === 'gradient',
          [styles.buttonIsNaked]: color === 'naked',
          [styles.buttonIsBlack]: color === 'black',
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
    return (
      <input className={buttonClasses} form={form} id={id} name={name} type="submit" value={text} />
    );
  }

  return (
    <button className={buttonClasses} id={id} type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'gradient',
  form: undefined,
  id: undefined,
  name: undefined,
  type: 'button',
};

Button.propTypes = {
  color: PropTypes.oneOf(Object.values(ButtonColorEnum)),
  form: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(Object.values(ButtonSizeEnum)),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ButtonTypeEnum)),
};

export default Button;
