import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Represents the possibles movimentations on the books
 * @constructor
 * @param {string} book - The book to be mounted on component instance
 */
class BookMovimentation extends Component{

  constructor(props){
    super(props);
  }

  render(){

    return(
      <select>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

BookMovimentation.propTypes = {
  book: PropTypes.object.isRequired
}

export default BookMovimentation;