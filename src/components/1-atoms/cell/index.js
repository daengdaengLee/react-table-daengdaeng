import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({
  width,
  minWidth,
  backgroundColor,
  color,
  borderTop,
  borderLeft,
  fontWeight,
  style,
  onClick,
  onContextMenu,
  children,
  ...props
}) => (
  <div
    style={{
      width,
      minWidth,
      backgroundColor,
      color,
      borderTop,
      borderLeft,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      fontWeight,
      fontSize: '12px',
      ...style,
    }}
    onClick={onClick}
    onContextMenu={onContextMenu}
    {...props}
  >
    {children}
  </div>
);

Cell.defaultProps = {
  width: '100px',
  minWidth: '100px',
  backgroundColor: '#ffffff',
  color: '#777777',
  borderTop: '1px #ebebeb solid',
  borderLeft: '1px #ebebeb solid',
  fontWeight: 400,
  style: {},
  onClick: event => {},
  onContextMenu: event => {},
  children: null,
};

Cell.propTypes = {
  width: PropTypes.string,
  minWidth: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderTop: PropTypes.string,
  borderLeft: PropTypes.string,
  fontWeight: PropTypes.number,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  children: PropTypes.node,
};

export default Cell;
