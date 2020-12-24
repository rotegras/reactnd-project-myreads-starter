import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  updateSearch = (value) => {
    this.props.updateSearch(value);
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value },
      this.updateSearch(value)
    )
  }

  moveBookToShelf = (book, shelf) => {
    this.props.moveBookToShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={this.state.search}
            placeholder="Search by title or author"
            onChange={(e) => this.handleChange(e)}
            autoFocus
          />
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  moveBookToShelf: PropTypes.func.isRequired,
}


export default SearchBar;
