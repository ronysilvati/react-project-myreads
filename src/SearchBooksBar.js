import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description Represent a bar to search books
 */
class SearchBooksBar extends Component{

  constructor(props){
    super(props);
  }

  render(){

    const {handleSearchField,prepareBookshelfs}  = this.props;

    return (
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search" onClick={prepareBookshelfs}>Close</button>
        </Link>

        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onKeyUp={handleSearchField}/>
        </div>
      </div>
    );
  }

}

SearchBooksBar.propTypes = {
  handleSearchField: PropTypes.func.isRequired,
  prepareBookshelfs: PropTypes.func.isRequired
};

export default SearchBooksBar;