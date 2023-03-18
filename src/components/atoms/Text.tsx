import * as PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

import { TextAlignment, TextAlignmentEnum, TextSize, TextSizeEnum } from '../../types';

import styles from './Text.module.css';

const Text: React.FunctionComponent<{
  alignment?: TextAlignment;
  children: React.ReactNode;
  customClasses?: string;
  isBlack?: boolean;
  isHelpText?: boolean;
  size?: TextSize;
}> = ({ alignment, children, customClasses, isBlack, isHelpText, size }) => {
  const textStyles = React.useMemo(
    () =>
      cn(
        styles.text,
        {
          [styles.textIsCenter]: alignment === 'center',
          [styles.textIsLeft]: alignment === 'left',
          [styles.textIsRight]: alignment === 'right',
          [styles.textIsHelpText]: isHelpText,
          [styles.textIsSmall]: size === 'small',
          [styles.textIsMedium]: size === 'medium',
          [styles.textIsLarge]: size === 'large',
          [styles.textIsBlack]: isBlack,
        },
        customClasses,
      ),
    [alignment, customClasses, isHelpText, isBlack, size],
  );

  // render
  return <div className={textStyles} dangerouslySetInnerHTML={{ __html: children as string }} />;
};

Text.defaultProps = {
  alignment: 'left',
  isBlack: false,
  isHelpText: false,
  size: 'medium',
};

Text.propTypes = {
  alignment: PropTypes.oneOf<TextAlignment>(Object.values(TextAlignmentEnum)),
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  isBlack: PropTypes.bool,
  isHelpText: PropTypes.bool,
  size: PropTypes.oneOf<TextSize>(Object.values(TextSizeEnum)),
};

export default Text;
