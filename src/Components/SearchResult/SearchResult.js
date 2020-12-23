import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Book from '../Book';


const SearchResult = (props) => {
  const { moveBookToShelf, books } = props;

  const moveTo = (book, shelf) => {
    moveBookToShelf(book, shelf);
  }

  // console.table('imageLinks: ', books.map(book => Object.keys(book.imageLinks).length || 'false'));

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

