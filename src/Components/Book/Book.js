import React from 'react';
import * as BooksAPI from '../../BooksAPI';
import PropTypes from 'prop-types';


const defaultBook = {
    authors: ['Javi Ortega'],
    title: 'Learning React',
    imageLinks: {
        smallThumbnail: 'somtext',
      },
    shelf: 'none',
}


const Book = ({ book = defaultBook, moveBookToShelf, isSearchPage }) => {
  const { authors, title, imageLinks, shelf } = book;

  const handleChange = (e) => {
    const { value } = e.target;
    BooksAPI.update(book, value);
    moveBookToShelf(book, value);
  }

  console.table(book);

  const getOpacity = () => { let opacity = shelf && shelf !== 'none' ? '.1' : '1';
    if (isSearchPage === false) {
      opacity = '1';
    }
    return opacity;
  }

  const backgroundImage =
    imageLinks && imageLinks.smallThumbnail ?
      book.imageLinks.smallThumbnail :
      '';

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${backgroundImage})`,
              opacity: `${getOpacity()}`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => handleChange(e)}
              value={shelf || 'none'} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" defaultValue>Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.array,
    title: PropTypes.string.isRequired,
    imageLinks: PropTypes.object.isRequired,
    shelf: PropTypes.string,
  }).isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
  isSearchPage: PropTypes.bool.isRequired,
}

export default Book;
