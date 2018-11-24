import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksCurrentlyReading: [],
    booksWantToRead: [],
    booksRead: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)  => {

      books.forEach((book)  => {
        this.insertBookIntoCorrectBookshelf(book);
      })

    });
  }

  /**
   * @description Insert a book into correct bookshelf.
   * This method is called when this application call a
   * list of books from API.
   * @param book
   */
  insertBookIntoCorrectBookshelf(book){
    if(book instanceof Object){
      try{
        if(book.shelf === 'currentlyReading'){
          this.setState((oldState)  => ({
            booksWantToRead: [...oldState.booksWantToRead,book]
          }));
        }
        else if(book.shelf === 'wantToRead'){
          this.setState((oldState)  => ({
            booksWantToRead: [...oldState.booksWantToRead,book]
          }));
        }
        else if(book.shelf === 'read'){
          this.setState((oldState)  => ({
            booksRead: [...oldState.booksRead,book]
          }));
        }
      }
      catch(err){
        console.log(err);
      }
    }
  }

  /**
   * @description Insert the received book into correct bookshelf.
   * Note that call the API of books, update the book and call
   * again all books also would solve the problem, but the
   * consum of resources would be not necessary.
   * @param {object} - book
   * @param {string} - shelf
   */
  movimentBookIntoCorrectBookshelf(book,shelf){
    try{
      if((book instanceof Object) && (shelf instanceof String)){
        BooksAPI.update(book,book.shelf).then((data)  =>  {
          if(this.removeBookFromOldBookshelf(book)){
            book.shelf = shelf;

            if(book.shelf === 'currentlyReading'){
              this.setState((oldState)  => ({
                booksWantToRead: [...oldState.booksWantToRead,book]
              }));
            }
            else if(book.shelf === 'wantToRead'){
              this.setState((oldState)  => ({
                booksWantToRead: [...oldState.booksWantToRead,book]
              }));
            }
            else if(book.shelf === 'read'){
              this.setState((oldState)  => ({
                booksRead: [...oldState.booksRead,book]
              }));
            }
          }
        }).catch((err)  => {
          console.log(err);
        });
      }
    }
    catch(err){
      console.log(err);
    }
  }

  /**
   * @description Remove a book from a old bookshelf
   * @param {object} - book
   * @returns {boolean}
   */
  removeBookFromOldBookshelf(book){
    if(book instanceof Object){
      try{
        if(book.shelf === 'currentlyReading'){
          const newListOfCurrentlyReading = this.state.booksCurrentlyReading.filter((bookOnShelf) =>  {
            if(bookOnShelf.id !== book.id){
              return bookOnShelf;
            }
          });

          this.setState(()  => ({
            booksCurrentlyReading: newListOfCurrentlyReading
          }));

          return true;
        }
        else if(book.shelf === 'wantToRead'){
          const newListOfWantToRead = this.state.booksWantToRead.filter((bookOnShelf) =>  {
            if(bookOnShelf.id !== book.id){
              return bookOnShelf;
            }
          });

          this.setState(()  => ({
            booksWantToRead: newListOfWantToRead
          }));

          return true;
        }
        else if(book.shelf === 'read'){
          const newListOfRead = this.state.booksRead.filter((bookOnShelf) =>  {
            if(bookOnShelf.id !== book.id){
              return bookOnShelf;
            }
          });

          this.setState(()  => ({
            booksRead: newListOfRead
          }));

          return true;
        }
      }
      catch(err){
        console.log(err);
      }
    }

    return false;
  }

  /**
   * @description Send a book to new bookshelf
   * @param book
   * @param toBookshelf
   */
  movimentBookOnBookshelf(book,toBookshelf){
    if((book instanceof Object) && (toBookshelf)){
      this.movimentBookIntoCorrectBookshelf(book,toBookshelf);
    }
  }

  render() {
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */
    let {booksCurrentlyReading,booksWantToRead,booksRead} = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads Radar</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading" books={booksCurrentlyReading}/>
                <Bookshelf title="Want to Read" books={booksWantToRead}/>
                <Bookshelf title="Read" books={booksRead}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
