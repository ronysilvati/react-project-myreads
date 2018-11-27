import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBooksBar from './SearchBooksBar';
import Book from './Book';
import * as BooksAPI from './BooksAPI';;

/**
 * @description Represents the a search of books
 * @constructor
 */
class SearchBooks extends Component{

  constructor(props){
    super(props);
  }

  state = {
    booksResultOfSearch: []
  }

  /**
   * @description Handle query of user
   * @param event
   */
  handleSearchField = (event) => {
    const query = event.target.value;

    this.findBook(query);
  }

  /**
   * @description This method find a book in BooksAPI with a query defined by user on key press
   * in input search. If the query is empty, the list of books results of previus query is empty.
   * @param {string} - query
   */
  findBook  = (query) => {
    if(query){
      BooksAPI.search(query)
        .then((books)  => {
          if(books instanceof Array){

            this.setState(()  => ({
              booksResultOfSearch: books
            }));

          }
          else{
            this.setState(()  => ({
              booksResultOfSearch: []
            }));
          }
        })
        .catch((err)  => {
          console.log(err);
        });
    }
    else{
      this.setState(()  => ({
        booksResultOfSearch: []
      }));
    }
  }

  render(){
    const {booksResultOfSearch} = this.state;
    const {prepareBookshelfs,movimentBook,bookOnShelf,shelfs} = this.props;

    return (
      <div className="search-books">
        <SearchBooksBar handleSearchField={this.handleSearchField.bind(this)}
                        prepareBookshelfs={prepareBookshelfs.bind(this)}
                        />
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (booksResultOfSearch.length > 0) &&
              booksResultOfSearch.map((book)  => {
                return <Book book={book} movimentBook={movimentBook.bind(this)}
                             key={book.id}
                             bookOnShelf={bookOnShelf.bind(this)}
                             shelfs={shelfs}/>
              })
            }

            {
              !(booksResultOfSearch.length > 0) && <li>No results to show</li>
            }
          </ol>
        </div>
      </div>
    );

  }

}

SearchBooks.propTypes = {
  movimentBook: PropTypes.func.isRequired,
  prepareBookshelfs: PropTypes.func.isRequired,
  bookOnShelf: PropTypes.func.isRequired,
  shelfs: PropTypes.array.isRequired
}

export default SearchBooks;