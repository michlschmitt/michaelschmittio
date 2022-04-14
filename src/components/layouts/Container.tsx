// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

// import styles
import styles from './Container.module.css';

// define component
const Container: React.FunctionComponent<{
  children: React.ReactNode;
  lg?: boolean;
  md?: boolean;
  xl?: boolean;
}> = ({ children, md, lg, xl }) => {
  // init styles
  const containerStyles = React.useMemo(
    () =>
      cn(styles.container, {
        [styles.containerIsMd]: md,
        [styles.containerIsLg]: lg,
        [styles.containerIsXl]: xl,
      }),
    [md, lg, xl],
  );

  // render
  return (
    <div className={styles.wrapper}>
      <div className={containerStyles}>{children}</div>
    </div>
  );
};

Container.defaultProps = {
  lg: false,
  md: false,
  xl: false,
};

Container.propTypes = {
  children: PropTypes.node.isRequired as React.Validator<React.ReactNode>,
  lg: PropTypes.bool,
  md: PropTypes.bool,
  xl: PropTypes.bool,
};

export default Container;
