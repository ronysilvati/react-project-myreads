import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfBooks from './BookshelfBooks';


class Bookshelf extends Component{

  /**
   * @description Represent a Bookshelf
   * @constructor
   * @param {string} title - The title of Bookshelf
   */
  constructor(props){

    super(props);
    this.state = props;

  }

  render(){
    /**
     * Through destructuring assignment, recover a list of books to be rendered and
     * the title of the bookshelf
     */
    const {title,books} = this.state;

    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookshelfBooks books={books}/>
      </div>

    );

  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}

export default Bookshelf;