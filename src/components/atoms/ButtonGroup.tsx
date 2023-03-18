import * as PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { ButtonGroupAlignment, ButtonGroupAlignmentEnum } from '../../types';

import styles from './ButtonGroup.module.css';

const ButtonGroup: React.FunctionComponent<{
  alignment?: ButtonGroupAlignment;
  children: React.ReactNode;
}> = ({ alignment, children }) => (
  <div
    className={classNames(styles.group, {
      [styles.groupIsCenter]: alignment === 'center',
      [styles.groupIsLeft]: alignment === 'left',
      [styles.groupIsRight]: alignment === 'right',
    })}
  >
    {children}
  </div>
);

ButtonGroup.defaultProps = {
  alignment: 'left',
};

ButtonGroup.propTypes = {
  alignment: PropTypes.oneOf(Object.values(ButtonGroupAlignmentEnum)),
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default ButtonGroup;
