import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import ErrorBoundary from './Components/ErrorBoundary';
import BookShelf from './Components/BookShelf';
import SearchButton from './Components/SearchButton'
import * as BooksAPI from './BooksAPI';
import './App.css';


const SHELVES = [
  {
    id: 'wantToRead',
    name: 'Want to Read',
  },
  {
    id: 'currentlyReading',
    name: 'Currenty Reading',
  },
  {
    id: 'read',
    name: 'Read',
  }
]

class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((booksList) => this.setState({ books: booksList }))
      .catch((error) => console.log(error));
  }

  moveBookToShelf = (book, shelf) => {
    const restOfBooks = this.state.books.filter(b => b !== book);
    const bookToUpdate = { ...book, 'shelf': shelf };
    this.setState({
      books: restOfBooks.concat(bookToUpdate)
    }, () => BooksAPI.update(book, shelf))
  }

  sortBooks = (books) => {
    return SHELVES.map((shelf) => {
      const booksInThisShelf = books.filter(book => book.shelf === shelf.id);
      return (
        <BookShelf
          key={shelf.id}
          shelf={shelf}
          books={booksInThisShelf}
          moveBookToShelf={this.moveBookToShelf}
        />
      )
    })
  }

  render() {
    return (
      <div className="app">
          <Route path='/search'>
            <ErrorBoundary>
              <SearchBar
                books={this.state.books}
                moveBookToShelf={this.moveBookToShelf}
              />
            </ErrorBoundary>
          </Route>

          <Route path='/' exact>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {
                  this.sortBooks(this.state.books)
                }
              </div>
              <SearchButton />
            </div>
          </Route>
      </div>
    )
  }
}


export default BooksApp;
