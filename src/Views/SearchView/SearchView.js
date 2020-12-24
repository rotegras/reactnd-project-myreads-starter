import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../Components/SearchBar';
import ErrorBoundary from '../../Components/ErrorBoundary';
import SearchResult from '../../Components/SearchResult';
import * as BooksAPI from '../../BooksAPI';


class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      search: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { books } = this.props;
    if (books !== prevProps.books) {
      this.search(this.state.search);
    }
  }

  search = (value) => {
    BooksAPI.search(value)
      .then((booksList) => {
        if(booksList && booksList.length > 0) {
          const result = booksList.map((item) => {
            const bk = this.props.books.filter((b) => b.id === item.id)[0];
            if (bk) return bk;
            return item;
          });
          this.setState({ searchResult: result });
          return;
        }
        this.setState({ searchResult: [] });
      })
      .catch((err) => console.log(err));
  }

  moveBookToShelf = (book, shelf) => {
    this.props.moveBookToShelf(book, shelf);
  }

  updateSearch = (value) => {
    this.setState({ search: value },
    () => this.search(this.state.search))
  }

  render() {
    const { search, searchResult } = this.state;

    return (
      <div className="search-books">
        <ErrorBoundary>
          <SearchBar
            books={this.state.books}
            moveBookToShelf={this.moveBookToShelf}
            search={search}
            updateSearch={this.updateSearch}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <SearchResult
            books={searchResult}
            moveBookToShelf={this.moveBookToShelf}
          />
        </ErrorBoundary>
      </div>
    )
  }
}

SearchView.propTypes = {
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
}

export default SearchView;
