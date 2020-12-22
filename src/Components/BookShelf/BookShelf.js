import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';


const BookShelf = (props) => {
  const { books, shelfId, shelfTitle, moveBookToShelf } = props;

  const onMoveTo = (book, shelf) => {
    moveBookToShelf(book, shelf);
  }


  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelfId={shelfId}
              shelfTitle={shelfTitle}
              moveBookToShelf={onMoveTo}
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
  shelfTitle: PropTypes.string.isRequired,
  shelfId: PropTypes.string.isRequired,
}


export default BookShelf;
