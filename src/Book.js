import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookMovimentation from './BookMovimentation';

/**
 * @description Represents a book
 * @constructor
 * @param {string} book - The book to be mounted on component instance
 * @param {function} movimentBook - The action to move a book
 */
class Book extends Component{

  constructor(props){

    super(props);

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */

    const {book, movimentBook} = this.props;

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <BookMovimentation book={book} movimentBook={movimentBook}/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {
            book.authors.map((author) => {
              return `${author}`
            }).join(', ')
          }
        </div>
      </div>
    );

  }

}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  movimentBook: PropTypes.func.isRequired
}

export default Book;