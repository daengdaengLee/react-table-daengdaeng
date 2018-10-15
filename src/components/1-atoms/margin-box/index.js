import React from 'react';
import PropTypes from 'prop-types';

const MarginBox = ({ height }) => <div style={{ height, minHeight: height }} />;

MarginBox.defaultProps = {
  height: '0px',
};

MarginBox.propTypes = {
  height: PropTypes.string,
};

export default MarginBox;
