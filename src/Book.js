import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookMovimentation from './BookMovimentation';

/**
 * @description Represents a book
 * @constructor
 * @param {string} book - The book to be mounted on component instance
 */
class Book extends Component{

  constructor(props){

    super(props);

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */

    const { book } = this.props;

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
          <div className="book-shelf-changer">
            <BookMovimentation book={book}/>
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
  book: PropTypes.object.isRequired
}

export default Book;