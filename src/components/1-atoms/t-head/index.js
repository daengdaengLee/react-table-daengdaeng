import React from 'react';
import PropTypes from 'prop-types';

const THead = ({
  height,
  minHeight,
  zIndex,
  style,
  children,
  innerRef,
  ...props
}) => (
  <div
    ref={innerRef}
    style={{
      height,
      minHeight,
      zIndex,
      position: 'relative',
      widht: '100%',
      display: 'flex',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

THead.defaultProps = {
  height: '40px',
  minHeight: '40px',
  zIndex: 100,
  style: {},
  children: null,
  innerRef: () => {},
};

THead.propTypes = {
  height: PropTypes.string,
  minHeight: PropTypes.string,
  zIndex: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default THead;
