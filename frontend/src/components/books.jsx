import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "../services/bookService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import { getCategory } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import BookTable from "./booksTable";
import { toast } from "react-toastify";
import _ from "lodash";

class Books extends Component {
  state = {
    books: [],
    categories: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { column: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getCategory();
    const categories = [{ _id: "", name: "All categories" }, ...data];

    const { data: books } = await getBooks();
    this.setState({ books, categories: categories });
  }

  handleDelete = async (book) => {
    const originalBooks = this.state.books;

    const new_books = originalBooks.filter((b) => b._id !== book._id);
    this.setState({ books: new_books });

    try {
      await deleteBook(book._id);
    } catch (ex) {
      if (ex.response && ex.response === 404) {
        toast.error("This book has already been deleted");

        this.setState({ books: originalBooks });
      }
    }
  };

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedCategory: null, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (book) => {
    const new_books = [...this.state.books];
    const index = new_books.indexOf(book);
    new_books[index] = { ...new_books[index] };
    new_books[index].liked = !new_books[index].liked;

    this.setState({ books: new_books });
  };

  handleOnSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedCategory,
      searchQuery,
      books: allBooks,
    } = this.state;

    // Search & filter
    let filtered = allBooks;

    if (searchQuery)
      filtered = allBooks.filter((b) =>
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory._id)
      filtered = allBooks.filter((category) => category._id === selectedCategory._id);

    //sorting books by columns
    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

    // paginate books
    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  }

  render() {
    const { length: count } = this.state.books;
    const { user } = this.props;

    if (count === 0) return <p>No books in the database</p>;
    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/books/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Book
            </Link>
          )}
          <p>Showing {totalCount} books in the database</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <BookTable
            books={books}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            sortColumn={this.state.sortColumn}
            onSort={this.handleOnSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Books;
