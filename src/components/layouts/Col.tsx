import React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

import { ColOffsetType, ColSpanType } from '../../types';

import styles from './Col.module.css';

const Col: React.FunctionComponent<{
  children: React.ReactNode;
  offset?: ColOffsetType;
  offsetLg?: ColOffsetType;
  offsetMd?: ColOffsetType;
  offsetSm?: ColOffsetType;
  offsetXl?: ColOffsetType;
  span: ColSpanType;
  spanLg?: ColSpanType;
  spanMd?: ColSpanType;
  spanSm?: ColSpanType;
  spanXl?: ColSpanType;
}> = ({
  children,
  offset,
  offsetLg,
  offsetMd,
  offsetSm,
  offsetXl,
  span,
  spanLg,
  spanMd,
  spanSm,
  spanXl,
}) => {
  const colStyles = React.useMemo(
    () =>
      cn(
        {
          [styles.colOffset0]: offset === 0,
          [styles.colOffset1]: offset === 1,
          [styles.colOffset2]: offset === 2,
          [styles.colOffset3]: offset === 3,
          [styles.colOffset4]: offset === 4,
          [styles.colOffset5]: offset === 5,
          [styles.colOffset6]: offset === 6,
          [styles.colOffset7]: offset === 7,
          [styles.colOffset8]: offset === 8,
          [styles.colOffset9]: offset === 9,
          [styles.colOffset10]: offset === 10,
          [styles.colOffset11]: offset === 11,
          [styles.colOffsetSm0]: offsetSm === 0,
          [styles.colOffsetSm1]: offsetSm === 1,
          [styles.colOffsetSm2]: offsetSm === 2,
          [styles.colOffsetSm3]: offsetSm === 3,
          [styles.colOffsetSm4]: offsetSm === 4,
          [styles.colOffsetSm5]: offsetSm === 5,
          [styles.colOffsetSm6]: offsetSm === 6,
          [styles.colOffsetSm7]: offsetSm === 7,
          [styles.colOffsetSm8]: offsetSm === 8,
          [styles.colOffsetSm9]: offsetSm === 9,
          [styles.colOffsetSm10]: offsetSm === 10,
          [styles.colOffsetSm11]: offsetSm === 11,
          [styles.colOffsetMd0]: offsetMd === 0,
          [styles.colOffsetMd1]: offsetMd === 1,
          [styles.colOffsetMd2]: offsetMd === 2,
          [styles.colOffsetMd3]: offsetMd === 3,
          [styles.colOffsetMd4]: offsetMd === 4,
          [styles.colOffsetMd5]: offsetMd === 5,
          [styles.colOffsetMd6]: offsetMd === 6,
          [styles.colOffsetMd7]: offsetMd === 7,
          [styles.colOffsetMd8]: offsetMd === 8,
          [styles.colOffsetMd9]: offsetMd === 9,
          [styles.colOffsetMd10]: offsetMd === 10,
          [styles.colOffsetMd11]: offsetMd === 11,
          [styles.colOffsetLg0]: offsetLg === 0,
          [styles.colOffsetLg1]: offsetLg === 1,
          [styles.colOffsetLg2]: offsetLg === 2,
          [styles.colOffsetLg3]: offsetLg === 3,
          [styles.colOffsetLg4]: offsetLg === 4,
          [styles.colOffsetLg5]: offsetLg === 5,
          [styles.colOffsetLg6]: offsetLg === 6,
          [styles.colOffsetLg7]: offsetLg === 7,
          [styles.colOffsetLg8]: offsetLg === 8,
          [styles.colOffsetLg9]: offsetLg === 9,
          [styles.colOffsetLg10]: offsetLg === 10,
          [styles.colOffsetLg11]: offsetLg === 11,
          [styles.colOffsetXl0]: offsetXl === 0,
          [styles.colOffsetXl1]: offsetXl === 1,
          [styles.colOffsetXl2]: offsetXl === 2,
          [styles.colOffsetXl3]: offsetXl === 3,
          [styles.colOffsetXl4]: offsetXl === 4,
          [styles.colOffsetXl5]: offsetXl === 5,
          [styles.colOffsetXl6]: offsetXl === 6,
          [styles.colOffsetXl7]: offsetXl === 7,
          [styles.colOffsetXl8]: offsetXl === 8,
          [styles.colOffsetXl9]: offsetXl === 9,
          [styles.colOffsetXl10]: offsetXl === 10,
          [styles.colOffsetXl11]: offsetXl === 11,
          [styles.colSpan1]: span === 1,
          [styles.colSpan2]: span === 2,
          [styles.colSpan3]: span === 3,
          [styles.colSpan4]: span === 4,
          [styles.colSpan5]: span === 5,
          [styles.colSpan6]: span === 6,
          [styles.colSpan7]: span === 7,
          [styles.colSpan8]: span === 8,
          [styles.colSpan9]: span === 9,
          [styles.colSpan10]: span === 10,
          [styles.colSpan11]: span === 11,
          [styles.colSpan12]: span === 12,
          [styles.colSpanSm1]: spanSm === 1,
          [styles.colSpanSm2]: spanSm === 2,
          [styles.colSpanSm3]: spanSm === 3,
          [styles.colSpanSm4]: spanSm === 4,
          [styles.colSpanSm5]: spanSm === 5,
          [styles.colSpanSm6]: spanSm === 6,
          [styles.colSpanSm7]: spanSm === 7,
          [styles.colSpanSm8]: spanSm === 8,
          [styles.colSpanSm9]: spanSm === 9,
          [styles.colSpanSm10]: spanSm === 10,
          [styles.colSpanSm11]: spanSm === 11,
          [styles.colSpanSm12]: spanSm === 12,
          [styles.colSpanMd1]: spanMd === 1,
          [styles.colSpanMd2]: spanMd === 2,
          [styles.colSpanMd3]: spanMd === 3,
          [styles.colSpanMd4]: spanMd === 4,
          [styles.colSpanMd5]: spanMd === 5,
          [styles.colSpanMd6]: spanMd === 6,
          [styles.colSpanMd7]: spanMd === 7,
          [styles.colSpanMd8]: spanMd === 8,
          [styles.colSpanMd9]: spanMd === 9,
          [styles.colSpanMd10]: spanMd === 10,
          [styles.colSpanMd11]: spanMd === 11,
          [styles.colSpanMd12]: spanMd === 12,
          [styles.colSpanLg1]: spanLg === 1,
          [styles.colSpanLg2]: spanLg === 2,
          [styles.colSpanLg3]: spanLg === 3,
          [styles.colSpanLg4]: spanLg === 4,
          [styles.colSpanLg5]: spanLg === 5,
          [styles.colSpanLg6]: spanLg === 6,
          [styles.colSpanLg7]: spanLg === 7,
          [styles.colSpanLg8]: spanLg === 8,
          [styles.colSpanLg9]: spanLg === 9,
          [styles.colSpanLg10]: spanLg === 10,
          [styles.colSpanLg11]: spanLg === 11,
          [styles.colSpanLg12]: spanLg === 12,
          [styles.colSpanXl1]: spanXl === 1,
          [styles.colSpanXl2]: spanXl === 2,
          [styles.colSpanXl3]: spanXl === 3,
          [styles.colSpanXl4]: spanXl === 4,
          [styles.colSpanXl5]: spanXl === 5,
          [styles.colSpanXl6]: spanXl === 6,
          [styles.colSpanXl7]: spanXl === 7,
          [styles.colSpanXl8]: spanXl === 8,
          [styles.colSpanXl9]: spanXl === 9,
          [styles.colSpanXl10]: spanXl === 10,
          [styles.colSpanXl11]: spanXl === 11,
          [styles.colSpanXl12]: spanXl === 12,
        },
        styles.col,
      ),
    [offset, offsetSm, offsetMd, offsetLg, offsetXl, span, spanSm, spanMd, spanLg, spanXl],
  );

  return <div className={colStyles}>{children}</div>;
};

Col.defaultProps = {
  offset: 0,
};

Col.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  offset: PropTypes.oneOf<ColOffsetType>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  offsetSm: PropTypes.oneOf<ColOffsetType>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  offsetMd: PropTypes.oneOf<ColOffsetType>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  offsetLg: PropTypes.oneOf<ColOffsetType>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  offsetXl: PropTypes.oneOf<ColOffsetType>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  span: PropTypes.oneOf<ColSpanType>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
  spanSm: PropTypes.oneOf<ColSpanType>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  spanMd: PropTypes.oneOf<ColSpanType>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  spanLg: PropTypes.oneOf<ColSpanType>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  spanXl: PropTypes.oneOf<ColSpanType>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

export default Col;
