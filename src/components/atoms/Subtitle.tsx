// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

// import types
import { HeadingAlignment, HeadingAlignmentEnum } from '../../types';

// import styles
import styles from './Subtitle.module.css';

// define component
const Subtitle: React.FunctionComponent<{
  alignment?: HeadingAlignment;
  children: React.ReactNode;
  customClasses?: string;
  isBlack?: boolean;
  isWhite?: boolean;
}> = ({ alignment, children, customClasses, isBlack, isWhite }) => {
  // init styles
  const subtitleStyles = React.useMemo(
    () =>
      cn(
        styles.subtitle,
        {
          [styles.subtitleLeft]: alignment === 'left',
          [styles.subtitleCenter]: alignment === 'center',
          [styles.subtitleRight]: alignment === 'right',
          [styles.subtitleIsBlack]: isBlack,
          [styles.subtitleIsWhite]: isWhite,
        },
        customClasses,
      ),
    [alignment, customClasses, isBlack, isWhite],
  );

  // render
  return <div className={subtitleStyles}>{children}</div>;
};

Subtitle.defaultProps = {
  alignment: 'left',
  customClasses: undefined,
  isBlack: false,
  isWhite: false,
};

Subtitle.propTypes = {
  alignment: PropTypes.oneOf(Object.values(HeadingAlignmentEnum)),
  children: PropTypes.node.isRequired,
  customClasses: PropTypes.string,
  isBlack: PropTypes.bool,
  isWhite: PropTypes.bool,
};

export default Subtitle;
