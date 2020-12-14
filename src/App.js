import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BooksSearchBar from './Components/BooksSearchBar';
import BookShelf from './Components/BookShelf';
import SearchButton from './Components/SearchButton'
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    shelves: [
      {
        id: 'wantToRead',
        title: 'Want to Read',
        books: []
      },
      {
        id: 'currentlyReading',
        title: 'Currenty Reading',
        books: []
      },
      {
        id: 'read',
        title: 'Read',
        books: []
      }
    ]
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((booksList) => {
        this.setState({ books: booksList })
        booksList.map((book) => {
          this.moveBookToShelf(book)
        })
      })
      .catch((error) => console.log(error));
  }

  moveBookToShelf = (book, shelfName = book.shelf) => {
      if (shelfName === 'none') return null;
      const shelf = { ...this.state.shelves.filter((shelf) => shelf.id === shelfName)}[0];
      shelf.books.push(book);
      BooksAPI.update(book, shelfName);
      this.setState((prevState) =>({ ...prevState, shelf }))
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
                {
                  this.state.shelves.map((shelf) => (
                    <BookShelf
                      key={shelf.id}
                      shelfId={shelf.id}
                      shelfTitle={shelf.title}
                      books={shelf.books}
                      moveTo={this.moveBookToShelf}
                    />
                  ))
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
