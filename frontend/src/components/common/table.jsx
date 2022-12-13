import React from "react";
import TableHeaders from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;

  return (
    <table className="table">
      <TableHeaders columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
