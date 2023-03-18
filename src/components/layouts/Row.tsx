import React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

import {
  RowAlignItemsEnum,
  RowAlignItemsType,
  RowJustifyEnum,
  RowJustifyType,
  RowWrapEnum,
  RowWrapType,
} from '../../types';

import styles from './Row.module.css';

const Row: React.FunctionComponent<{
  alignItems?: RowAlignItemsType;
  children: React.ReactNode;
  wrap?: RowWrapType;
  justify?: RowJustifyType;
}> = ({ alignItems, children, justify, wrap }) => {
  const rowStyles = React.useMemo(
    () =>
      cn(styles.row, {
        [styles.rowWrap]: wrap === 'wrap',
        [styles.rowWrapReverse]: wrap === 'wrap-reverse',
        [styles.rowNoWrap]: wrap === 'nowrap',
        [styles.rowJustifyFlexStart]: justify === 'flex-start',
        [styles.rowJustifyCenter]: justify === 'center',
        [styles.rowJustifyFlexEnd]: justify === 'flex-end',
        [styles.rowJustifySpaceBetween]: justify === 'space-between',
        [styles.rowJustifySpaceAround]: justify === 'space-around',
        [styles.rowJustifySpaceEvenly]: justify === 'space-evenly',
        [styles.rowAlignItemsFlexStart]: alignItems === 'flex-start',
        [styles.rowAlignItemsCenter]: alignItems === 'center',
        [styles.rowAlignItemsFlexEnd]: alignItems === 'flex-end',
        [styles.rowAlignItemsStretch]: alignItems === 'stretch',
        [styles.rowAlignItemsBaseline]: alignItems === 'baseline',
      }),
    [alignItems, justify, wrap],
  );

  return <div className={rowStyles}>{children}</div>;
};

Row.defaultProps = {
  alignItems: 'flex-start',
  justify: 'flex-start',
  wrap: 'wrap',
};

Row.propTypes = {
  alignItems: PropTypes.oneOf(Object.values(RowAlignItemsEnum)),
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  justify: PropTypes.oneOf(Object.values(RowJustifyEnum)),
  wrap: PropTypes.oneOf(Object.values(RowWrapEnum)),
};

export default Row;
