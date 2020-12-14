import React, { Component } from 'react';
import * as BooksAPI from '../../BooksAPI';
import PropTypes from 'prop-types';


class Book extends Component {
  state = {
    open: false,
  }

  moveTo = (e) => {
    const { value } = e.target;
    const { book } = this.props;
    BooksAPI.update(book, value);
    this.props.moveTo(book, value);
    this.setState({ open: false });
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.state.open ? (
      this.moveTo(e)
    ) : (this.setState({ open: true }));
  }

  render() {
    const { authors, title, imageLinks } = this.props.book;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}
            ></div>
            <div className="book-shelf-changer">
              <select onClick={(e) => this.handleClick(e)}>
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
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveTo: PropTypes.func.isRequired,
  shelfId: PropTypes.string.isRequired,
  shelfTitle: PropTypes.string.isRequired,
}

export default Book;
