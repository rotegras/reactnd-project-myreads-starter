import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';


const BookShelf = (props) => {
  const { books, shelf, moveBookToShelf } = props;

  const onMoveTo = (book, shelf) => {
    moveBookToShelf(book, shelf);
  }


  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book) => (
            <Book
              key={book.id}
              book={book}
              moveBookToShelf={onMoveTo}
              searchPage={false}
            />
            ))
          }
          {/* <Book /> */}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  shelf: PropTypes.object.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
}


export default BookShelf;
