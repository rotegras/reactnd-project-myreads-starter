import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';


class BooksSearchBar extends Component {
  state = {
    showSearchPage: false,
    search: '',
    books: []
  }

  search = (value) => {
      BooksAPI.search(value)
      .then((booksList) => {
        this.setState({ books: booksList })
      })
  }

  handleChange = (value) => {
    this.setState(() => ({ search: value }),
      this.search(value)
    )
  }

  render() {
    return (
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={this.state.search}
            placeholder="Search by title or author"
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </div>
      </div>
    )
  }
}

export default BooksSearchBar;
