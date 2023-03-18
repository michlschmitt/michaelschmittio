import * as PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { InputType, InputTypeEnum, InputSizeEnum, InputSize } from '../../types';

import styles from './Input.module.css';

const Input: React.FunctionComponent<{
  customInputClasses?: string;
  customLabelClasses?: string;
  form?: string;
  id?: string;
  labelText?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  size?: InputSize;
  type?: InputType;
  value: string;
}> = ({
  customInputClasses,
  customLabelClasses,
  form,
  id,
  labelText,
  name,
  onChange,
  placeholderText,
  size,
  type,
  value,
}) => {
  // has label
  if (labelText) {
    return (
      <label className={styles.label} htmlFor={id}>
        <span className={classNames(styles.labelText, customLabelClasses)}>{labelText}</span>
        <input
          className={classNames(
            styles.input,
            {
              [styles.inputIsSmall]: size === 'small',
              [styles.inputIsMedium]: size === 'medium',
              [styles.inputIsLarge]: size === 'large',
            },
            customInputClasses,
          )}
          form={form}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholderText}
          type={type}
          value={value}
        />
      </label>
    );
  }

  return (
    <input
      className={classNames(
        styles.input,
        {
          [styles.inputIsSmall]: size === 'small',
          [styles.inputIsMedium]: size === 'medium',
          [styles.inputIsLarge]: size === 'large',
        },
        customInputClasses,
      )}
      form={form}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholderText}
      type={type}
      value={value}
    />
  );
};

Input.defaultProps = {
  form: undefined,
  id: undefined,
  labelText: undefined,
  size: 'medium',
  type: 'text',
};

Input.propTypes = {
  form: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(InputSizeEnum)),
  type: PropTypes.oneOf(Object.values(InputTypeEnum)),
  value: PropTypes.string.isRequired,
};

export default Input;
