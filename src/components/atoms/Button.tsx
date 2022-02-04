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
  onClick?: () => void;
  size?: ButtonSize;
  text: string;
  type?: ButtonType;
}> = ({ color, customClasses, form, id, name, onClick, size, text, type }) => {
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
      <input
        className={buttonClasses}
        form={form}
        id={id}
        name={name}
        onClick={onClick}
        type="submit"
        value={text}
      />
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} id={id} type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'gradient',
  form: undefined,
  id: undefined,
  name: undefined,
  onClick: undefined,
  type: 'button',
};

Button.propTypes = {
  color: PropTypes.oneOf(Object.values(ButtonColorEnum)),
  form: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(ButtonSizeEnum)),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ButtonTypeEnum)),
};

export default Button;
