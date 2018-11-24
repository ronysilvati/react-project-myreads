import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Represents the possibles movimentations on the books
 * @constructor
 * @param {string} book - The book to be mounted on component instance
 * @param {function} movimentBook - The action to move a book
 */
class BookMovimentation extends Component{

  constructor(props){

    super(props);

  }

  moveBook  = (event) => {
    const book = this.props.book;
    this.props.movimentBook(book,event.target.value);
  }

  render(){

    return(
      <select onClick={this.moveBook}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading" disabled={this.props.book.shelf === 'currentlyReading' ? true : null}>Currently Reading</option>
        <option value="wantToRead" disabled={this.props.book.shelf === 'wantToRead' ? true : null}>Want to Read</option>
        <option value="read" disabled={this.props.book.shelf === 'read' ? true : null}>Read</option>
        <option value="none" disabled={this.props.book.shelf === 'none' ? true : null}>None</option>
      </select>
    );
  }
}

BookMovimentation.propTypes = {
  book: PropTypes.object.isRequired,
  movimentBook: PropTypes.func.isRequired
}

export default BookMovimentation;