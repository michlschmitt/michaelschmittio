import React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

import {
  SectionColorEnum,
  SectionColorType,
  SectionPaddingEnum,
  SectionPaddingType,
} from '../../types';

import styles from './Section.module.css';

const Section: React.FunctionComponent<{
  color?: SectionColorType;
  children: React.ReactNode;
  padding?: SectionPaddingType;
}> = ({ color, children, padding }) => {
  const sectionStyles = React.useMemo(
    () =>
      cn(styles.section, {
        [styles.sectionIsBlack]: color === 'black',
        [styles.sectionIsGradientHorizontal]: color === 'gradient-horizontal',
        [styles.sectionIsGradient]: color === 'gradient',
        [styles.sectionIsGreen]: color === 'green',
        [styles.sectionIsGrey1]: color === 'grey1',
        [styles.sectionIsGrey2]: color === 'grey2',
        [styles.sectionIsPrimary]: color === 'primary',
        [styles.sectionIsSecondary]: color === 'secondary',
        [styles.sectionPaddingLarge]: padding === 'large',
        [styles.sectionPaddingMedium]: padding === 'medium',
        [styles.sectionPaddingNone]: padding === 'none',
        [styles.sectionPaddingSmall]: padding === 'small',
      }),
    [color, padding],
  );

  return <div className={sectionStyles}>{children}</div>;
};

Section.defaultProps = {
  color: 'black',
  padding: 'medium',
};

Section.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  color: PropTypes.oneOf(Object.values(SectionColorEnum)),
  padding: PropTypes.oneOf(Object.values(SectionPaddingEnum)),
};

export default Section;
