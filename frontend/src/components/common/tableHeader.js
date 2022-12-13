import React, { Component } from 'react';

class TableHeaders extends Component {
    raiseSort = (column) => {
        // implementing reverse sorting
        const sortColumn = { ...this.props.sortColumn };
    
        if (sortColumn.column === column)
          sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
          sortColumn.column = column;
          sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
      };

      renderSortIcon = (column) => {
        if (column.column !== this.props.sortColumn.column ) return null;
        if (this.props.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>
        return <i className='fa fa-sort-desc'></i>
      }

    render() { 
        return (
        <thead>
          <tr>
            {this.props.columns.map(column => 
            <th
            className="clickable"
            key={column.column || column.key} 
            onClick={() => this.raiseSort(column.column)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>)}
          </tr> 
        </thead>);
    }
}
 
export default TableHeaders;