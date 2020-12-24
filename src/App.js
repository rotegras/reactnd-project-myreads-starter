import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ShelvesView from './Views/ShelvesView';
import SearchView from './Views/SearchView';
import * as BooksAPI from './BooksAPI';
import './App.css';


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

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route path='/' exact>
          <ShelvesView
            books={books}
            moveBookToShelf={this.moveBookToShelf}
          />
        </Route>
        <Route path='/search'>
          <SearchView
            books={books}
            moveBookToShelf={this.moveBookToShelf}
          />
        </Route>
      </div>
    )
  }
}


export default BooksApp;
