// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

// import styles
import styles from './Container.module.css';

// define component
const Container: React.FunctionComponent<{ children: React.ReactNode; isTight?: boolean }> = ({
  children,
  isTight,
}) => {
  // init styles
  const containerStyles = React.useMemo(
    () =>
      cn(styles.inner, { [styles.containerIsTight]: isTight, [styles.containerIsWide]: !isTight }),
    [isTight],
  );

  // render
  return (
    <div className={styles.container}>
      <div className={containerStyles}>{children}</div>
    </div>
  );
};

Container.defaultProps = {
  isTight: false,
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isTight: PropTypes.bool,
};

export default Container;
