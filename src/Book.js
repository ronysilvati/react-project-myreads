import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BookMovimentation from './BookMovimentation';

/**
 * @description Represents a book
 * @constructor
 * @param {string} book - The book to be mounted on component instance
 * @param {function} movimentBook - The action to move a book
 * @param {function} bookOnShelf - Verify if a book exists into a shelf
 */
class Book extends PureComponent{

  constructor(props){

    super(props);

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */

    const {book, movimentBook, shelfs, bookOnShelf} = this.props;

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url("${
              (book.imageLinks) && book.imageLinks.smallThumbnail
          }")` }}></div>
          <div className="book-shelf-changer">
            <BookMovimentation book={book} movimentBook={movimentBook} shelfs={shelfs} bookOnShelf={bookOnShelf}/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {
            ('authors' in book) &&
              book.authors.map((author) => {
                return `${author}`
              }).join(', ')
          }

          {
            !('authors' in book) &&
                <li>No authors</li>
          }
        </div>
      </div>
    );

  }

}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  movimentBook: PropTypes.func.isRequired,
  shelfs: PropTypes.array.isRequired,
  bookOnShelf: PropTypes.func.isRequired
}

export default Book;