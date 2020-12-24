import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Book from '../Book';


const SearchResult = ({ books, moveBookToShelf }) => {

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


export default SearchResult;

