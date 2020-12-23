import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchResult from '../SearchResult';
import * as BooksAPI from '../../BooksAPI';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResult: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.books !== prevProps.books) {
      this.search(this.state.search);
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  search = (value) => {
    BooksAPI.search(value)
      .then((booksList) => {
        if(booksList && booksList.length > 0) {
          const result = booksList.map((item) => {
            const bk = this.props.books.filter((b) => b.id === item.id)[0];
            if (bk) { return bk };
            return item;
          });
          this.setState({ searchResult: result });
          return;
        }
        this.setState({ searchResult: [] });
      })
      // .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value },
    this.search(value)
    )
  }

  moveBookToShelf = (book, shelf) => {
    this.props.moveBookToShelf(book, shelf);
  }

  render() {
    const { searchResult } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={this.state.search}
            placeholder="Search by title or author"
            onChange={(e) => this.handleChange(e)}
            autoFocus
          />
        </div>
      </div>

        <SearchResult
          books={searchResult}
          moveBookToShelf={this.moveBookToShelf}
          />
      </div>
    )
  }
}

SearchBar.propTypes = {
  moveBookToShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
}


export default SearchBar;
