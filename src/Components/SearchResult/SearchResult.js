import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import Book from '../Book';


const SearchResult = ({ moveBookToShelf, books }) => {

  const moveTo = (book, shelf) => {
    moveBookToShelf(book, shelf);
  }

  return (
    <div className="search-books-results">
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books && books.length > 1 &&
              books.map((book) => (
                <ErrorBoundary key={book.id}>
                  <Book
                    key={book.id}
                    book={book}
                    moveBookToShelf={moveTo}
                    isSearchPage={true}
                  />
                </ErrorBoundary>
              ))
            }
          </ol>
        </div>
      </div>
    </div>
  )
}

SearchResult.propTypes = {
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
}


export default SearchResult;
