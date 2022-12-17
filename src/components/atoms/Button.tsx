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
  isLoading?: boolean;
  name?: string;
  onClick?: () => void;
  size?: ButtonSize;
  text: string;
  type?: ButtonType;
}> = ({ color, customClasses, form, id, name, isLoading, onClick, size, text, type }) => {
  // init vars
  const spinner = ['▖', '▘', '▝', '▗'];

  // init states
  const [spinnerIndex, setSpinnerIndex] = React.useState<number>(0);

  // init refs
  const spinnerRef = React.useRef<ReturnType<typeof setInterval>>();

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

  React.useEffect(() => {
    if (isLoading) {
      // update spinner index every 50ms
      spinnerRef.current = setInterval(() => {
        setSpinnerIndex((prev) => (prev + 1) % spinner.length);
      }, 100);
    } else {
      // clear interval
      clearInterval(spinnerRef.current);
    }

    return () => {
      // clear interval
      clearInterval(spinnerRef.current);
    };
  }, [isLoading, spinner.length, spinnerIndex]);

  return (
    <button className={buttonClasses} onClick={onClick} form={form} id={id} name={name} type={type}>
      {isLoading && <span className={styles['spinner']}>{spinner[spinnerIndex]}</span>} {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'gradient',
  form: undefined,
  id: undefined,
  isLoading: false,
  name: undefined,
  onClick: undefined,
  type: 'button',
};

Button.propTypes = {
  color: PropTypes.oneOf(Object.values(ButtonColorEnum)),
  form: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(ButtonSizeEnum)),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ButtonTypeEnum)),
};

export default Button;
