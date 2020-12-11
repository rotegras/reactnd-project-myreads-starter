import React, { Component } from 'react';


class Book extends Component {
  state = {
    open: false,
  }

  moveTo = (e) => {
    const { value } = e.target;
    this.props.moveTo(value, this.props.book);
  }

  handleClick = (e) => {
    // e.preventDefault();
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

export default Book;
