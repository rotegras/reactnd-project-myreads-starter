import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SearchBar = ({ updateSearch, search }) => {

  const onUpdateSearch = (value) => {
    updateSearch(value);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    onUpdateSearch(value)
  }

  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          value={search}
          placeholder="Search by title or author"
          onChange={(e) => handleChange(e)}
          autoFocus
        />
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
}


export default SearchBar;
