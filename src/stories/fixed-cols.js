import React, { Component } from 'react';
import { Table } from '../components';

class FixedColsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [...Array(20)].map((v, i) => ({
        id: `${i + 1}`,
        title: `COL_${i + 1}`,
      })),
      rows: [...Array(30)].map((v, i) => {
        const obj = { id: `${i + 1}` };
        [...Array(20)].forEach((v, j) => {
          obj[j + 1] = `${i + 1}-${j + 1}`;
        });
        return obj;
      }),
    };
  }

  render() {
    const { columns, rows } = this.state;
    return (
      <Table
        width="500px"
        height="500px"
        columns={columns}
        rows={rows}
        fixedColNum={2}
      />
    );
  }
}

export default FixedColsTable;
