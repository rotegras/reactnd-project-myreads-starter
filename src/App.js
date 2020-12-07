import React, { Component } from 'react';
import BooksSearchBar from './Components/BooksSearchBar';
import BookShelf from './Components/BookShelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelves: [
      {
        title: 'Want to Read',
        books: []
      },
      {
        title: 'Currenty Reading',
        books: []
      },
      {
        title: 'Read',
        books: []
      }
    ],
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((booksList) => {
        this.setState({ books: booksList })
      });
  }



  render() {

    return (
      <div className="app">
        {
          this.state.showSearchPage ? (
            <div className="search-books">
              <BooksSearchBar />
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {
                    this.state.shelves.map((shelf) => (
                      <BookShelf
                        title={shelf.title}
                      />
                    ))
                }
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default BooksApp;
