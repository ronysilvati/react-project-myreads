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

  /**
   * @description Allow user move a book in shelfs
   * @param {object} - event
   */
  moveBook  = (event) => {
    this.props.movimentBook(this.props.book,event.target.value);
  }

  render(){
    const {book} = this.props;

    return(
      <select onChange={this.moveBook}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading" disabled={book.shelf === 'currentlyReading' ? true : null}>Currently Reading</option>
        <option value="wantToRead" disabled={book.shelf === 'wantToRead' ? true : null}>Want to Read</option>
        <option value="read" disabled={book.shelf === 'read' ? true : null}>Read</option>
        <option value="none" disabled={!('shelf' in book) ? true : null}>None</option>
      </select>
    );
  }
}

BookMovimentation.propTypes = {
  book: PropTypes.object.isRequired,
  movimentBook: PropTypes.func.isRequired
}

export default BookMovimentation;