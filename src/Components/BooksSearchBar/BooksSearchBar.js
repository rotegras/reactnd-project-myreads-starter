import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';
import * as BooksAPI from '../../BooksAPI';


class BooksSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      search: '',
      books: []
    }
  }

  search = (value) => {
    BooksAPI.search(value)
      .then((booksList) => {
        this.setState(() => ({ books: booksList || [] }))
      })
      .catch((error) => console.log(error));
  }

  handleChange = (value) => {
    this.setState(() => ({ search: value }),
      this.search(value)
    )
  }

  render() {
    const { books } = this.state;
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
        {books.length && books.map((book) => (
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid">
                <Book book={book}/>
              </ol>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default BooksSearchBar;
