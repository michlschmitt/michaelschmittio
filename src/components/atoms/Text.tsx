// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import cn from 'classnames';

// import types
import { TextAlignment, TextAlignmentEnum, TextSize, TextSizeEnum } from '../../types';

// import styles
import styles from './Text.module.css';

// define components
const Text: React.FunctionComponent<{
  alignment?: TextAlignment;
  children: React.ReactNode;
  customClasses?: string;
  isHelpText?: boolean;
  size?: TextSize;
}> = ({ alignment, children, customClasses, isHelpText, size }) => {
  // init styles
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
        },
        customClasses,
      ),
    [alignment, customClasses, isHelpText, size],
  );
  // render
  return <div className={textStyles} dangerouslySetInnerHTML={{ __html: children as string }} />;
};

Text.defaultProps = {
  alignment: 'left',
  isHelpText: false,
  size: 'medium',
};

Text.propTypes = {
  alignment: PropTypes.oneOf<TextAlignment>(Object.values(TextAlignmentEnum)),
  children: PropTypes.node.isRequired,
  isHelpText: PropTypes.bool,
  size: PropTypes.oneOf<TextSize>(Object.values(TextSizeEnum)),
};

export default Text;
