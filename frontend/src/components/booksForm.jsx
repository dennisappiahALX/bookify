import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBook, saveBook } from "../services/bookService";
import { getCategory } from "../services/categoryService";

class BookForm extends Form {
  state = {
    data: { title: "", categoryId: "", numberInStock: "", dailyRentalRate: "" },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    categoryId: Joi.string().required().label("category"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Daily Rental Rate"),
  };

  async populateCategories() {
    const { data: categories } = await getCategory();
    this.setState({ categories: categories });
  }

  async populateBook() {
    try {
      const bookId = this.props.match.params.id;
      if (bookId === "new") return;
      const { data: book } = await getBook(bookId);
      this.setState({ data: this.mapToViewModel(book) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCategories();
    await this.populateBook();
  }

  mapToViewModel(book) {
    return {
      _id: book._id,
      title: book.title,
      categoryId: book.category._id,
      numberInStock: book.numberInStock,
      dailyRentalRate: book.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveBook(this.state.data);

    this.props.history.push("/books");
  };

  render() {
    return (
      <div>
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;
