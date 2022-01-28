// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import cn from 'classnames';

// import types
import { InputType, InputTypeEnum, InputSizeEnum, InputSize } from '../../types';

// import styles
import styles from './Input.module.css';

// define components
const Input: React.FunctionComponent<{
  customInputClasses?: string;
  customLabelClasses?: string;
  id: string;
  labelText?: string;
  name: string;
  placeholderText: string;
  size?: InputSize;
  type?: InputType;
}> = ({
  customInputClasses,
  customLabelClasses,
  id,
  labelText,
  name,
  placeholderText,
  size,
  type,
}) => {
  // init styles
  const inputStyles = React.useMemo(
    () =>
      cn(
        styles.input,
        {
          [styles.inputIsSmall]: size === 'small',
          [styles.inputIsMedium]: size === 'medium',
          [styles.inputIsLarge]: size === 'large',
        },
        customInputClasses,
      ),
    [customInputClasses, size],
  );
  const labelStyles = React.useMemo(
    () => cn(styles.label, customLabelClasses),
    [customLabelClasses],
  );

  // has label
  if (labelText) {
    return (
      <label className={labelStyles} htmlFor={id}>
        <span className={styles.labelText}>{labelText}</span>
        <input
          className={inputStyles}
          id={id}
          name={name}
          placeholder={placeholderText}
          type={type}
        />
      </label>
    );
  }

  // render
  return (
    <input className={inputStyles} id={id} name={name} placeholder={placeholderText} type={type} />
  );
};

Input.defaultProps = {
  labelText: undefined,
  size: 'medium',
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(InputSizeEnum)),
  type: PropTypes.oneOf(Object.values(InputTypeEnum)),
};

export default Input;
