import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);
    this._fixedCols = React.createRef();
  }

  render() {
    const { _fixedCols } = this;
    const { width, height, setScrollRef, onClickContainer } = this.props;

    return (
      <div
        style={{
          width,
          height,
          overflow: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}
        ref={setScrollRef}
        onClick={onClickContainer}
      >
        <div ref={_fixedCols} style={{ position: 'relative' }}>
          <div>fixed cols head</div>
          <div>fixed cols body</div>
        </div>
        <div>
          <div>head</div>
          <div>body</div>
        </div>
      </div>
    );
  }
}

Table.defaultProps = {
  rows: [],
  columns: [],
  width: '100%',
  height: '100%',
  tableBodyMarginTop: '0px',
  tableBodyMarginBottom: '0px',
  fixedColNum: 0,
  setScrollRef: el => {},
  onScroll: event => {},
  onClickContainer: event => {},
  renderCell: (row, col) => {},
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.string,
  height: PropTypes.string,
  tableBodyMarginTop: PropTypes.string,
  tableBodyMarginBottom: PropTypes.string,
  fixedColNum: PropTypes.number,
  setScrollRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onScroll: PropTypes.func,
  onClickContainer: PropTypes.func,
  renderCell: PropTypes.func,
};

export default Table;
