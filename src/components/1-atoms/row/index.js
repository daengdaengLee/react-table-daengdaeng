import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ rowHeight, children }) => (
  <div style={{ height: rowHeight, minHeight: rowHeight, display: 'flex' }}>
    {children}
  </div>
);

Row.defaultProps = {
  rowHeight: '40px',
  children: null,
};

Row.propTypes = {
  rowHeight: PropTypes.string,
  children: PropTypes.node,
};

export default Row;
