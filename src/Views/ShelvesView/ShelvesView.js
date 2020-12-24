import React, { Component } from 'react';
import SearchButton from '../../Components/SearchButton'
import BookShelf from '../../Components/BookShelf';
import SHELVES from '../../constants';


const ShelvesView = ({ books, moveBookToShelf }) => {

  const moveTo = (book, shelf) => {
    moveBookToShelf(book, shelf);
  }

  const sortBooks = (books) => {
    return SHELVES.map((shelf) => {
      const booksInThisShelf = books.filter(book => book.shelf === shelf.id);
      return (
        <BookShelf
          key={shelf.id}
          shelf={shelf}
          books={booksInThisShelf}
          moveBookToShelf={moveTo}
        />
      )
    })
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {
          sortBooks(books)
        }
      </div>
      <SearchButton />
    </div>
  )
}


export default ShelvesView;
