// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

// import components
import Container from './Container';

// import styles
import styles from './GridSection.module.css';

// define component
const GridSection: React.FunctionComponent<{
  firstColSpan?: 4 | 6 | 8;
  secondColSpan?: 4 | 6 | 8;
  firstColComponent: React.ReactNode;
  secondColComponent: React.ReactNode;
}> = ({ firstColSpan, secondColSpan, firstColComponent, secondColComponent }) => {
  // init styles
  const firstColStyles = React.useMemo(
    () =>
      cn({
        [styles.firstCol4]: firstColSpan === 4,
        [styles.firstCol6]: firstColSpan === 6,
        [styles.firstCol8]: firstColSpan === 8,
      }),
    [firstColSpan],
  );
  const secondColStyles = React.useMemo(
    () =>
      cn({
        [styles.secondCol4]: secondColSpan === 4,
        [styles.secondCol6]: secondColSpan === 6,
        [styles.secondCol8]: secondColSpan === 8,
      }),
    [secondColSpan],
  );

  // render
  return (
    <div className={styles.section}>
      <Container>
        <div className={styles.gridContainer}>
          <div className={firstColStyles}>{firstColComponent}</div>
          <div className={secondColStyles}>{secondColComponent}</div>
        </div>
      </Container>
    </div>
  );
};

GridSection.defaultProps = {
  firstColSpan: 4,
  secondColSpan: 8,
};

GridSection.propTypes = {
  firstColSpan: PropTypes.oneOf([4, 6, 8]),
  secondColSpan: PropTypes.oneOf([4, 6, 8]),
  firstColComponent: PropTypes.node.isRequired,
  secondColComponent: PropTypes.node.isRequired,
};

export default GridSection;
