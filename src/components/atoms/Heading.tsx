// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import cn from 'classnames';

// import types
import { HeadingAlignment, HeadingAlignmentEnum, HeadingTag, HeadingTagEnum } from '../../types';

// import styles
import styles from './Heading.module.css';

// define components
const Heading: React.FunctionComponent<{
  alignment?: HeadingAlignment;
  customClasses?: string;
  children: React.ReactNode;
  tag: HeadingTag;
}> = ({ alignment, customClasses, children, tag }) => {
  // define className
  const headingStyles = React.useMemo(
    () =>
      cn(
        styles.heading,
        {
          [styles.headingLeft]: alignment === 'left',
          [styles.headingCenter]: alignment === 'center',
          [styles.headingRight]: alignment === 'right',
          [styles.heading1]: tag === 'h1',
          [styles.heading2]: tag === 'h2',
          [styles.heading3]: tag === 'h3',
          [styles.heading4]: tag === 'h4',
          [styles.heading5]: tag === 'h5',
          [styles.heading6]: tag === 'h6',
        },
        customClasses,
      ),
    [alignment, customClasses, tag],
  );

  switch (tag) {
    case 'h1':
      return (
        <h1 className={headingStyles} dangerouslySetInnerHTML={{ __html: children as string }} />
      );

    case 'h2':
      return (
        <h2 className={headingStyles} dangerouslySetInnerHTML={{ __html: children as string }} />
      );

    case 'h3':
      return (
        <h3 className={headingStyles} dangerouslySetInnerHTML={{ __html: children as string }} />
      );

    case 'h4':
      return (
        <h4 className={headingStyles} dangerouslySetInnerHTML={{ __html: children as string }} />
      );

    case 'h5':
      return (
        <h5 className={headingStyles} dangerouslySetInnerHTML={{ __html: children as string }} />
      );

    case 'h6':
      return (
        <h6 className={headingStyles} dangerouslySetInnerHTML={{ __html: children as string }} />
      );

    default: {
      throw new Error('Invalid tag type');
    }
  }
};

Heading.defaultProps = {
  alignment: 'left',
  customClasses: undefined,
};

Heading.propTypes = {
  alignment: PropTypes.oneOf<HeadingAlignment>(Object.values(HeadingAlignmentEnum)),
  customClasses: PropTypes.string,
  children: PropTypes.node.isRequired,
  tag: PropTypes.oneOf<HeadingTag>(Object.values(HeadingTagEnum)).isRequired,
};

export default Heading;
