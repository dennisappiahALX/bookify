import React, { Component } from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class BookTable extends Component {
  columns = [
    {
      column: "title",
      label: "Title",
      content: (book) => <Link to={`/books/${book._id}`}>{book.title}</Link>,
    },
    { column: "category.name", label: "Category" },
    { column: "numberInStock", label: "Stock" },
    { column: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (book) => (
        <Like liked={book.liked} onClick={() => this.props.onLike(book)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (book) => (
      <button
        onClick={() => this.props.onDelete(book)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { books, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BookTable;
