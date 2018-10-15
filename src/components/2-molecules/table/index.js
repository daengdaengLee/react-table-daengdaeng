import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { _firstToArray } from '../../../assets/js/utils';
import Cell from '../../1-atoms/cell';
import MarginBox from '../../1-atoms/margin-box';
import Row from '../../1-atoms/row';
import TBody from '../../1-atoms/t-body';
import THead from '../../1-atoms/t-head';

const _separteFixedCols = (columns, fixedColNum) => {
  const fixedColumns = _firstToArray(columns, fixedColNum);
  const restColumns = _.rest(columns, fixedColNum);
  return { fixedColumns, restColumns };
};

class Table extends Component {
  constructor(props) {
    super(props);
    this._fixedCols = React.createRef();
    this._fixedColsHeader = React.createRef();
    this._tableHeader = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._fixTop = this._fixTop.bind(this);
    this._fixLeft = this._fixLeft.bind(this);
  }

  render() {
    const { _fixedCols, _fixedColsHeader, _tableHeader, _onScroll } = this;
    const {
      rows,
      columns,
      width,
      height,
      rowHeight,
      tableBodyMarginTop,
      tableBodyMarginBottom,
      fixedColNum,
      rowIdKey,
      rowHeightKey,
      setScrollRef,
      onClickContainer,
      renderCell,
    } = this.props;
    const { fixedColumns, restColumns } = _separteFixedCols(
      columns,
      fixedColNum,
    );
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
        onScroll={_onScroll}
      >
        <div ref={_fixedCols} style={{ position: 'relative' }}>
          <THead
            innerRef={_fixedColsHeader}
            height={rowHeight}
            minHeight={rowHeight}
            zIndex={200}
          >
            {fixedColumns.map(col => renderCell(null, col))}
          </THead>
          <TBody marginTop={tableBodyMarginTop}>
            {rows.map(row => (
              <Row
                key={row[rowIdKey]}
                rowHeight={
                  _.isUndefined(row[rowHeightKey])
                    ? rowHeight
                    : row[rowHeightKey]
                }
              >
                {fixedColumns.map(col => renderCell(row, col))}
              </Row>
            ))}
            <MarginBox height={tableBodyMarginBottom} />
          </TBody>
        </div>
        <div>
          <THead
            innerRef={_tableHeader}
            height={rowHeight}
            minHeight={rowHeight}
          >
            {restColumns.map(col => renderCell(null, col))}
          </THead>
          <TBody marginTop={tableBodyMarginTop}>
            {rows.map(row => (
              <Row
                key={row[rowIdKey]}
                rowHeight={
                  _.isUndefined(row[rowHeightKey])
                    ? rowHeight
                    : row[rowHeightKey]
                }
              >
                {restColumns.map(col => renderCell(row, col))}
              </Row>
            ))}
            <MarginBox height={tableBodyMarginBottom} />
          </TBody>
        </div>
      </div>
    );
  }

  _onScroll(event) {
    const { _fixTop, _fixLeft } = this;
    const { onScroll } = this.props;
    _fixTop(event);
    _fixLeft(event);
    onScroll(event);
  }

  _fixTop({ target: { scrollTop } }) {
    const { _tableHeader, _fixedColsHeader } = this;
    _tableHeader.current.style.top = `${scrollTop}px`;
    _fixedColsHeader.current.style.top = `${scrollTop}px`;
  }

  _fixLeft({ target: { scrollLeft } }) {
    const { _fixedCols } = this;
    _fixedCols.current.style.left = `${scrollLeft}px`;
  }
}

Table.defaultProps = {
  rows: [],
  columns: [],
  width: '100%',
  height: '100%',
  rowHeight: '40px',
  tableBodyMarginTop: '0px',
  tableBodyMarginBottom: '0px',
  fixedColNum: 0,
  rowIdKey: 'id',
  rowHeightKey: 'height',
  setScrollRef: el => {},
  onScroll: event => {},
  onClickContainer: event => {},
  renderCell: (row, col) => (
    <Cell key={col.id}>{_.isNull(row) ? col.title : row[col.id]}</Cell>
  ),
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.string,
  height: PropTypes.string,
  rowHeight: PropTypes.string,
  tableBodyMarginTop: PropTypes.string,
  tableBodyMarginBottom: PropTypes.string,
  fixedColNum: PropTypes.number,
  rowIdKey: PropTypes.string,
  rowHeightKey: PropTypes.string,
  setScrollRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onScroll: PropTypes.func,
  onClickContainer: PropTypes.func,
  renderCell: PropTypes.func,
};

export default Table;
