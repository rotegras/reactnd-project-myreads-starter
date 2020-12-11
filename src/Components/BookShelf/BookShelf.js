import React, { Component } from 'react';
import Book from '../Book';


const BookShelf = (props) => {
  const { books, id, title } = props;

  const moveTo = (book, shelf) => {
    props.moveTo(book, shelf);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              moveTo={moveTo}
              shelfId={id}
              shelfTitle={title}
            />
          ))}
          {/* <Book /> */}
        </ol>
      </div>
    </div>
  )
}


export default BookShelf;
