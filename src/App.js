import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BooksSearchBar from './Components/BooksSearchBar';
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
        title: 'Want to Read',
      },
      {
        id: 'currentlyReading',
        title: 'Currenty Reading',
      },
      {
        id: 'read',
        title: 'Read',
      }
    ]
  }

  componentDidMount() {
    this.getBooks();
  }

  getRead = () => {
    // this.setState({ ''}
    // this.state.books.filter
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((booksList) => this.setState({ books: booksList }))
      .catch((error) => console.log(error));
  }

  sortBooks = (books) => {
    return this.shelves.map((shelf) => {
      const booksInThisShelf = books.filter(book => book.shelf === shelf.id);
      return (
        <BookShelf
          key={shelf.id}
          shelfId={shelf.id}
          shelfTitle={shelf.title}
          books={booksInThisShelf}
          // moveTo={this.moveBookToShelf}
        />
      )
    })
  }


  render() {
    return (
      <div className="app">
          <Route path='/search'>
              <div className="search-books">
                <BooksSearchBar moveTo={this.moveTo}/>
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
