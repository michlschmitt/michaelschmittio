import * as PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';

import { InputSizeEnum, InputSize } from '../../types';

import styles from './Textarea.module.css';

const Textarea: React.FunctionComponent<{
  customInputClasses?: string;
  customLabelClasses?: string;
  form?: string;
  id?: string;
  labelText?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholderText: string;
  size?: InputSize;
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
  value,
}) => {
  const textareaStyles = React.useMemo(
    () =>
      cn(
        styles.textarea,
        {
          [styles.textareaIsSmall]: size === 'small',
          [styles.textareaIsMedium]: size === 'medium',
          [styles.textareaIsLarge]: size === 'large',
        },
        customInputClasses,
      ),
    [customInputClasses, size],
  );
  const labelTextStyles = React.useMemo(
    () => cn(styles.labelText, customLabelClasses),
    [customLabelClasses],
  );

  // has label
  if (labelText) {
    return (
      <label className={styles.label} htmlFor={id}>
        <span className={labelTextStyles}>{labelText}</span>
        <TextareaAutosize
          className={textareaStyles}
          form={form}
          id={id}
          minRows={4}
          name={name}
          onChange={onChange}
          placeholder={placeholderText}
          value={value}
        />
      </label>
    );
  }

  // render
  return (
    <TextareaAutosize
      className={textareaStyles}
      form={form}
      id={id}
      minRows={4}
      name={name}
      onChange={onChange}
      placeholder={placeholderText}
      value={value}
    />
  );
};

Textarea.defaultProps = {
  id: undefined,
  labelText: undefined,
  size: 'medium',
};

Textarea.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(InputSizeEnum)),
  value: PropTypes.string.isRequired,
};

export default Textarea;
