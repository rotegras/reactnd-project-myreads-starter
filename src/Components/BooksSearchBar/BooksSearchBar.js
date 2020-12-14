import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from '../Book';
import * as BooksAPI from '../../BooksAPI';


class BooksSearchBar extends Component {
  static PropTypes = {
    shelfId: PropTypes.string.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired,
  }

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

  moveBookToShelf = (book, shelf) => {
    this.props.moveBookToShelf(book, shelf);
  }


  render() {
    const { books } = this.state;
    return (
      <div>
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

      {books.length && (
        <div className="search-books-results">
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    moveBookToShelf={this.moveBookToShelf}
                    shelfId="none"
                    shelfName='Nome'
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
      </div>
    )
  }
}

export default BooksSearchBar;
