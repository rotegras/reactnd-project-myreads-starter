import React, { Component } from 'react';
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
        <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
