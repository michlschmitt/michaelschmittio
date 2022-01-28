// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// define component
const Spacer: React.FunctionComponent<{ height: string; width?: string }> = ({ height, width }) => (
  <div style={{ height, width }} />
);

Spacer.defaultProps = {
  width: '100%',
};

Spacer.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string,
};

export default Spacer;
