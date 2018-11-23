import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * @description Represents a grid of books on the bookshelf
 * @constructor
 * @param {array} books - A list of books to be added on the grid
 */
class BookshelfBooks extends Component{

  constructor(props){

    super(props);
    this.state = props;

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */
    const {books} = this.state;

    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book)  => {
              return <li><Book book={book}/></li>
            })
          }
        </ol>
      </div>
    );

  }

}

BookshelfBooks.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookshelfBooks;