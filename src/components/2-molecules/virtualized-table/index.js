import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class VirtualizedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIdx: props.initRowIdx,
      colIdx: props.initColIdx,
    };
    this._fixedRow = React.createRef();
    this._fixedCol = React.createRef();
    this._fixedCorner = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._afterChangeRowIdx = this._afterChangeRowIdx.bind(this);
    this._afterChangeColIdx = this._afterChangeColIdx.bind(this);
    this._afterChangeRowColIdx = this._afterChangeRowColIdx.bind(this);
  }

  render() {
    const {
      _fixedRow,
      _fixedCol,
      _fixedCorner,
      _onScroll,
      props: {
        height,
        width,
        style,
        rowCount,
        colCount,
        renderRowCount,
        renderColCount,
        itemHeight,
        itemWidth,
        isFixedRow,
        isFixedCol,
        fixedRowHeight,
        fixedColWidth,
        fixedCornerStyle,
        renderItem,
        renderFixedRowItem,
        renderFixedColItem,
      },
      state: { rowIdx, colIdx },
    } = this;
    let fixedRow = [];
    if (isFixedRow) {
      for (let j = 0; j < renderColCount; j++) {
        const _cIdx = j + colIdx;
        const left = isFixedCol
          ? _cIdx * itemWidth + fixedColWidth
          : _cIdx * itemWidth;
        const style = {
          position: 'absolute',
          width: `${itemWidth}px`,
          height: `${fixedRowHeight}px`,
          top: 0,
          left: `${left}px`,
          zIndex: 4,
        };
        fixedRow.push(renderFixedRowItem(_cIdx, style));
      }
    }
    let fixedCol = [];
    if (isFixedCol) {
      for (let i = 0; i < renderRowCount; i++) {
        const _rIdx = i + rowIdx;
        const top = isFixedRow
          ? _rIdx * itemHeight + fixedRowHeight
          : _rIdx * itemHeight;
        const style = {
          position: 'absolute',
          width: `${fixedColWidth}px`,
          height: `${itemHeight}px`,
          left: 0,
          top,
          zIndex: 4,
        };
        fixedCol.push(renderFixedColItem(_rIdx, style));
      }
    }
    const rows = [];
    for (let i = 0; i < renderRowCount; i++) {
      const row = [];
      const _rIdx = i + rowIdx;
      for (let j = 0; j < renderColCount; j++) {
        const _cIdx = j + colIdx;
        const top = isFixedRow
          ? _rIdx * itemHeight + fixedRowHeight
          : _rIdx * itemHeight;
        const left = isFixedCol
          ? _cIdx * itemWidth + fixedColWidth
          : _cIdx * itemWidth;
        const style = {
          position: 'absolute',
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          top: `${top}px`,
          left: `${left}px`,
          zIndex: 2,
        };
        row.push(renderItem(_rIdx, _cIdx, style));
      }
      rows.push(<Fragment key={_rIdx}>{row}</Fragment>);
    }
    let fixedCorner;
    if (isFixedRow && isFixedCol) {
      const style = {
        ...fixedCornerStyle,
        position: 'absolute',
        width: `${fixedColWidth}px`,
        height: `${fixedRowHeight}px`,
        top: 0,
        left: 0,
        zIndex: 10,
      };
      fixedCorner = <div ref={_fixedCorner} style={style} />;
    }
    return (
      <div
        style={{ ...style, overflow: 'auto', width, height }}
        onScroll={_onScroll}
      >
        <div
          style={{
            position: 'relative',
            width: `${itemWidth * colCount}px`,
            height: `${itemHeight * rowCount}px`,
          }}
        >
          {isFixedRow && isFixedCol && fixedCorner}
          {isFixedRow && (
            <div ref={_fixedRow} style={{ position: 'absolute' }}>
              {fixedRow}
            </div>
          )}
          {isFixedCol && (
            <div ref={_fixedCol} style={{ position: 'absolute' }}>
              {fixedCol}
            </div>
          )}
          {rows}
        </div>
      </div>
    );
  }

  _onScroll({ target: { scrollTop, scrollLeft } }) {
    const {
      _fixedRow,
      _fixedCol,
      _fixedCorner,
      _afterChangeRowIdx,
      _afterChangeColIdx,
      _afterChangeRowColIdx,
      props: {
        itemHeight,
        itemWidth,
        isFixedRow,
        isFixedCol,
        rowCount,
        colCount,
        renderRowCount,
        renderColCount,
      },
      state: { rowIdx, colIdx },
    } = this;
    if (isFixedRow) {
      _fixedRow.current.style.top = `${scrollTop}px`;
    }
    if (isFixedCol) {
      _fixedCol.current.style.left = `${scrollLeft}px`;
    }
    if (isFixedRow && isFixedCol) {
      _fixedCorner.current.style.top = `${scrollTop}px`;
      _fixedCorner.current.style.left = `${scrollLeft}px`;
    }
    const currentRowIdx = Math.floor(scrollTop / itemHeight);
    const currentColIdx = Math.floor(scrollLeft / itemWidth);
    if (rowIdx !== currentRowIdx && colIdx !== currentColIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const maxColIdx = colCount - renderColCount;
      const updateRowIdx =
        currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      const updateColIdx =
        currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
      this.setState(
        { rowIdx: updateRowIdx, colIdx: updateColIdx },
        _afterChangeRowColIdx,
      );
    } else if (rowIdx !== currentRowIdx && colIdx === currentColIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const updateRowIdx =
        currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      this.setState({ rowIdx: updateRowIdx }, _afterChangeRowIdx);
    } else if (rowIdx === currentRowIdx && colIdx !== currentColIdx) {
      const maxColIdx = colCount - renderColCount;
      const updateColIdx =
        currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
      this.setState({ colIdx: updateColIdx }, _afterChangeColIdx);
    }
  }

  _afterChangeRowIdx() {
    const {
      props: { onChangeRowIdx },
      state: { rowIdx },
    } = this;
    onChangeRowIdx(rowIdx);
  }

  _afterChangeColIdx() {
    const {
      props: { onChangeColIdx },
      state: { colIdx },
    } = this;
    onChangeColIdx(colIdx);
  }

  _afterChangeRowColIdx() {
    const {
      props: { onChangeRowIdx, onChangeColIdx },
      state: { rowIdx, colIdx },
    } = this;
    onChangeRowIdx(rowIdx);
    onChangeColIdx(colIdx);
  }
}

VirtualizedTable.defaultProps = {
  height: 300,
  width: 300,
  style: {},
  rowCount: 1000,
  colCount: 100,
  renderRowCount: 10,
  renderColCount: 3,
  initRowIdx: 0,
  initColIdx: 0,
  itemHeight: 40,
  itemWidth: 120,
  isFixedRow: false,
  isFixedCol: false,
  fixedRowHeight: 50,
  fixedColWidth: 50,
  fixedCornerStyle: {
    backgroundColor: '#ffffff',
    border: '1px solid black',
    boxSizing: 'border-box',
  },
  renderItem: (rowIdx, colIdx, style) => (
    <div
      key={`${rowIdx},${colIdx}`}
      style={{
        ...style,
        backgroundColor: '#ffffff',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >{`${rowIdx}, ${colIdx}`}</div>
  ),
  renderFixedRowItem: (colIdx, style) => (
    <div
      key={`-1,${colIdx}`}
      style={{
        ...style,
        backgroundColor: '#ffffff',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >{`HEAD${colIdx}`}</div>
  ),
  renderFixedColItem: (rowIdx, style) => (
    <div
      key={`${rowIdx},-1`}
      style={{
        ...style,
        backgroundColor: '#ffffff',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >{`COL${rowIdx}`}</div>
  ),
  onChangeRowIdx: rowIdx => {},
  onChangeColIdx: colIdx => {},
};

VirtualizedTable.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  rowCount: PropTypes.number,
  colCount: PropTypes.number,
  renderRowCount: PropTypes.number,
  renderColCount: PropTypes.number,
  initRowIdx: PropTypes.number,
  initColIdx: PropTypes.number,
  itemHeight: PropTypes.number,
  itemWidth: PropTypes.number,
  isFixedRow: PropTypes.bool,
  isFixedCol: PropTypes.bool,
  fixedRowHeight: PropTypes.number,
  fixedColWidth: PropTypes.number,
  fixedCornerStyle: PropTypes.object,
  renderItem: PropTypes.func,
  renderFixedRowItem: PropTypes.func,
  renderFixedColItem: PropTypes.func,
  onChangeRowIdx: PropTypes.func,
  onChangeColIdx: PropTypes.func,
};

export default VirtualizedTable;
