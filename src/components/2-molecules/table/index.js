import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarginBox from '../../1-atoms/margin-box';
import TBody from '../../1-atoms/t-body';
import THead from '../../1-atoms/t-head';

class Table extends Component {
  constructor(props) {
    super(props);
    this._fixedCols = React.createRef();
    this._fixedColsHeader = React.createRef();
    this._tableHeader = React.createRef();
  }

  render() {
    const { _fixedCols, _fixedColsHeader, _tableHeader } = this;
    const {
      width,
      height,
      haederHeight,
      tableBodyMarginTop,
      tableBodyMarginBottom,
      setScrollRef,
      onClickContainer,
    } = this.props;

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
          <THead
            innerRef={_fixedColsHeader}
            height={haederHeight}
            minHeight={haederHeight}
            zIndex={200}
          >
            fixed cols head
          </THead>
          <TBody marginTop={tableBodyMarginTop}>
            <MarginBox height={tableBodyMarginBottom} />
          </TBody>
        </div>
        <div>
          <THead
            innerRef={_tableHeader}
            height={haederHeight}
            minHeight={haederHeight}
          >
            head
          </THead>
          <TBody marginTop={tableBodyMarginTop}>
            <MarginBox height={tableBodyMarginBottom} />
          </TBody>
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
  haederHeight: '40px',
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
  haederHeight: PropTypes.string,
  tableBodyMarginTop: PropTypes.string,
  tableBodyMarginBottom: PropTypes.string,
  fixedColNum: PropTypes.number,
  setScrollRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onScroll: PropTypes.func,
  onClickContainer: PropTypes.func,
  renderCell: PropTypes.func,
};

export default Table;
