import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Represents the possibles movimentations on the books
 * @constructor
 * @param {string} book - The book to be mounted on component instance
 * @param {function} movimentBook - The action to move a book
 * @param {function} bookOnShelf - Verify if a book exists in a shelf
 * @param {array} shelfs - A list of shelfs
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
    const {shelfs,book,bookOnShelf} = this.props;

    return(
      <select onChange={this.moveBook}>
        <option value="">Move to...</option>
        {
          shelfs.map((shelf)  =>  {
            return <option key={shelf.shelf} value={shelf.shelf} disabled={bookOnShelf(book,shelf.shelf)}>{shelf.title}</option>
          })
        }
        <option value="none" disabled={!bookOnShelf(book,null)}>None</option>
      </select>
    );
  }
}

BookMovimentation.propTypes = {
  book: PropTypes.object.isRequired,
  shelfs: PropTypes.array.isRequired,
  movimentBook: PropTypes.func.isRequired,
  bookOnShelf: PropTypes.func.isRequired,
}

export default BookMovimentation;