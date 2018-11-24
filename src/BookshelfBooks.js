import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * @description Represents a grid of books on the bookshelf
 * @constructor
 * @param {array} books - A list of books to be added on the grid
 * @param {function} movimentBook - The action to move a book
 */
class BookshelfBooks extends Component{

  constructor(props){

    super(props);

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */
    const {books, movimentBook} = this.props;

    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
          {

            // If the list of books contains some book, show it
            (books.length > 0) &&
              books.map((book)  => {
                  return <li key={book.id}><Book book={book} movimentBook={movimentBook}/></li>
                })

          }

          {

            // If the list of books is empty, show message
            (books.length === 0) && <li>This list is empty</li>

          }
        </ol>
      </div>
    );

  }

}

BookshelfBooks.propTypes = {
  books: PropTypes.array.isRequired,
  movimentBook: PropTypes.func.isRequired
}

export default BookshelfBooks;