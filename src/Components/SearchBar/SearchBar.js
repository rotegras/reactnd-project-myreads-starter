import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from '../Book';
import * as BooksAPI from '../../BooksAPI';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResult: [],
      render: true,
    }
  }

  search = (value) => {
    BooksAPI.search(value)
      .then((booksList) => {
        console.log(booksList);
        console.log(this.props.books);
        const result = booksList.map((item) => {
          const b = this.props.books.filter((b) => b.id=== item.id)[0];
          if (b) { return b };
          return item;
        })
        this.setState({searchResult: result || []})
      })
  }

  // return only books with shelf
  search_old = (value) => {
    BooksAPI.search(value)
    .then((booksList) => {
      console.log(booksList);
      const booksListWithShelf = booksList.map((book) => {
        const bookExists = this.props.books.filter((b) => {
          return b.shelf.length
        });
        console.log('book exists: ', bookExists);
        let checkBook = bookExists.length > 0 ?
        bookExists :
        book;
        return checkBook;
      })
      console.log(booksListWithShelf)
      this.setState({ searchResult: booksListWithShelf[0]})
    });
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
    const { searchResult } = this.state;
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

      {/* {searchResult.length && ( */}
        <div className="search-books-results">
        <div className="bookshelf">
        <div className="bookshelf-books">
        <ol className="books-grid">
        {this.state.render && searchResult.map((book) => (
          <Book
          key={book.id}
          book={book}
          moveBookToShelf={this.moveBookToShelf}
          />
          ))}
          </ol>
          </div>
          </div>
          </div>
          {/* )} */}
          </div>
          )
        }
      }

      SearchBar.propTypes = {
        moveBookToShelf: PropTypes.func.isRequired,
      }


      export default SearchBar;
