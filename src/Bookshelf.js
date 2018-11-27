import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfBooks from './BookshelfBooks';


class Bookshelf extends Component{

  /**
   * @description Represent a Bookshelf
   * @constructor
   * @param {string} title - The title of Bookshelf
   * @param {string} shelf - The shelf
   * @param {string} shelfs - The shelfs
   * @param {array} books - A list of books
   * @param {function} movimentBook - A method to moviment a book between shelfs
   * @param {function} bookOnShelf - Verify if a book exist into a shelf
   */
  constructor(props){

    super(props);

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered and
     * the title of the bookshelf
     */
    const {title,books,movimentBook,shelf,shelfs,bookOnShelf} = this.props;

    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookshelfBooks books={books}
                        movimentBook={movimentBook}
                        shelf={shelf}
                        shelfs={shelfs}
                        bookOnShelf={bookOnShelf}/>
      </div>

    );

  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  movimentBook: PropTypes.func.isRequired,
  bookOnShelf: PropTypes.func.isRequired
}

export default Bookshelf;