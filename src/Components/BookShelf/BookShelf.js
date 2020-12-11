import React, { Component } from 'react';
import BooksApp from '../../App';
import Book from '../Book';


const BookShelf = (props) => {
  const { title, books } = props;

  const moveTo = (book, shelf) => {
    this.props.moveTo(book, shelf);
    console.log(book, shelf);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} moveTo={moveTo}/>
          ))}
          {/* <Book /> */}
        </ol>
      </div>
    </div>
  )
}


export default BookShelf;
