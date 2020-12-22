import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import BookShelf from './Components/BookShelf';
import SearchButton from './Components/SearchButton'
import * as BooksAPI from './BooksAPI';
import './App.css';


class BooksApp extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    }
    this.shelves = [
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
    return this.shelves.map((shelf) => {
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
              <div className="search-books">
              <SearchBar
                books={this.state.books}
                moveBookToShelf={this.moveBookToShelf} />
              </div>
          </Route>

          <Route path='/' exact>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {/* {
                  this.state.shelves.map((shelf) => (
                    <BookShelf
                      key={shelf.id}
                      shelfId={shelf.id}
                      shelfTitle={shelf.title}
                      books={shelf.books}
                      // moveTo={this.moveBookToShelf}
                    />
                  ))
                } */}
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
