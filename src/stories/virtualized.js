import React, { Component } from 'react';
import { VirtualizedTable } from '../components';

const _makeCols = idx => [...Array(3)].map((_, j) => ({ colId: idx + j }));
const _makeRows = (rowIdx, colIdx) =>
  [...Array(16)].map((_, i) =>
    [...Array(3)]
      .map((_, j) => colIdx + j)
      .reduce((row, colId) => ({ ...row, [colId]: `${rowIdx + i},${colId}` }), {
        _id: rowIdx + i,
      }),
  );

class Virtualized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colIdx: 0,
      rowIdx: 0,
      cols: _makeCols(0),
      rows: _makeRows(0, 0),
    };
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
    this._onChangeRowIdx = this._onChangeRowIdx.bind(this);
    this._onChangeColIdx = this._onChangeColIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const {
      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
      _onChangeRowIdx,
      _onChangeColIdx,
    } = this;
    return (
      <VirtualizedTable
        height={600}
        width={400}
        rowCount={10000}
        colCount={400}
        renderRowCount={16}
        renderColCount={3}
        itemHeight={40}
        itemWidth={140}
        isFixedRow={true}
        isFixedCol={true}
        fixedRowHeight={80}
        fixedColWidth={40}
        fixedCornerStyle={{
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
        renderItem={_renderItem}
        renderFixedRowItem={_renderFixedRowItem}
        renderFixedColItem={_renderFixedColItem}
        onChangeRowIdx={_onChangeRowIdx}
        onChangeColIdx={_onChangeColIdx}
      />
    );
  }

  _renderItem(rowIdx, colIdx, style) {
    const { colIdx: startColIdx, rowIdx: startRowIdx, cols, rows } = this.state;
    const colKey = colIdx - startColIdx;
    const col = cols[colKey];
    const rowKey = rowIdx - startRowIdx;
    const row = rows[rowKey];
    const content = row && col && row[col.colId];
    return (
      <div
        key={`${rowIdx},${colIdx}`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {content}
      </div>
    );
  }

  _renderFixedRowItem(colIdx, style) {
    const { colIdx: startColIdx, cols } = this.state;
    const key = colIdx - startColIdx;
    const col = cols[key];
    return (
      <div
        key={`-1,${colIdx}`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {col && `COL_${col.colId}`}
      </div>
    );
  }

  _renderFixedColItem(rowIdx, style) {
    return (
      <div
        key={`${rowIdx},-1`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {rowIdx}
      </div>
    );
  }

  _onChangeRowIdx(rowIdx) {
    this.setState({ rowIdx }, this._update);
  }

  _onChangeColIdx(colIdx) {
    this.setState({ colIdx }, this._update);
  }

  _update() {
    const { rowIdx, colIdx } = this.state;
    setTimeout(
      () =>
        this.setState({
          rows: _makeRows(rowIdx, colIdx),
          cols: _makeCols(colIdx),
        }),
      1000,
    );
  }
}

export default Virtualized;
