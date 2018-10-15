import React from 'react';
import PropTypes from 'prop-types';

const TBody = ({ marginTop, style, children, ...props }) => (
  <div
    style={{
      marginTop,
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

TBody.defaultProps = {
  marginTop: '40px',
  style: {},
  children: null,
};

TBody.propTypes = {
  marginTop: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default TBody;
