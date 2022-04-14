// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import cn from 'classnames';

// import types
import { ButtonGroupAlignment, ButtonGroupAlignmentEnum } from '../../types';

// import styles
import styles from './ButtonGroup.module.css';

// define component
const ButtonGroup: React.FunctionComponent<{
  alignment?: ButtonGroupAlignment;
  children: React.ReactNode;
}> = ({ alignment, children }) => {
  // init styles
  const buttonGroupStyles = React.useMemo(
    () =>
      cn(styles.group, {
        [styles.groupIsCenter]: alignment === 'center',
        [styles.groupIsLeft]: alignment === 'left',
        [styles.groupIsRight]: alignment === 'right',
      }),
    [alignment],
  );

  // render
  return <div className={buttonGroupStyles}>{children}</div>;
};

ButtonGroup.defaultProps = {
  alignment: 'left',
};

ButtonGroup.propTypes = {
  alignment: PropTypes.oneOf(Object.values(ButtonGroupAlignmentEnum)),
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
};

export default ButtonGroup;
