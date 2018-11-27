import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  shelfs = [
    {
      title:  'Currently Reading',
      shelf:  'currentlyReading'
    },
    {
      title:  'Want to Read',
      shelf:  'wantToRead'
    },
    {
      title:  'Read',
      shelf:  'read'
    }
  ];

  state = {
    books: []
  }

  componentDidMount(){
    this.prepareBookshelfs();
  }

  prepareBookshelfs(){
    this.setState(()  => ({
      books: []
    }));

    BooksAPI.getAll().then((books)  => {
      this.setState(()  => ({
        books: books
      }));
    });
  }


  /**
   * @description Send a book to new bookshelf
   * @param book
   * @param toBookshelf
   */
  movimentBookOnBookshelf(book,toBookshelf){
    if((book instanceof Object) && (toBookshelf)){
      BooksAPI.update(book,toBookshelf).then((data)  =>  {
        this.prepareBookshelfs();
      }).catch((err)  => {
        console.log(err);
      });
    }
  }

  /**
   * This method verify if a book exists in a shelf
   * @param book
   * @param shelf
   * @returns {boolean}
   */
  bookOnShelf(book,shelf){
    const booksFinded = this.state.books.filter((bookOnList)  =>  {
      if(shelf !== null){
        if((bookOnList.id === book.id) && (bookOnList.shelf === shelf)){
          return bookOnList;
        }
      }
      else{
        if((bookOnList.id === book.id)){
          return bookOnList;
        }
      }
    });

    if(booksFinded.length > 0){
      return true;
    }

    return false;
  }

  render() {
    /**
     * Through destructuring assignment, recover a list of books to be rendered
     */
    let {books} = this.state;

    return (
      <Router>
        <div className="app">
            <Route exact path="/search" render={()  => (
              <SearchBooks movimentBook={this.movimentBookOnBookshelf.bind(this)}
                           prepareBookshelfs={this.prepareBookshelfs.bind(this)}
                           bookOnShelf={this.bookOnShelf.bind(this)}
                           shelfs={this.shelfs}/>
            )} />

            <Route exact path="/" render={({history})  => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads Radar</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {
                      this.shelfs.map((shelf)  => {
                        return <Bookshelf key={shelf.shelf}
                                          shelfs={this.shelfs}
                                          title={shelf.title}
                                          shelf={shelf.shelf}
                                          books={books}
                                          movimentBook={this.movimentBookOnBookshelf.bind(this)}
                                          bookOnShelf={this.bookOnShelf.bind(this)}/>
                      })
                    }
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
