import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
    ]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((booksList) => {
        this.setState({ books: booksList })
      })
      .catch((error) => console.log(error));
  }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/search'>
              <div className="search-books">
                <BooksSearchBar />
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
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
                        title={shelf.title}
                      />
                    ))
                }
              </div>
              <SearchButton />
            </div>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
