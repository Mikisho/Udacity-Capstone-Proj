import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
//Components
import BookShelf from './BookShelf'

class SearchBooks extends Component {

  state = {
    books: [],
    query: ''
  }

  mergeArr = (arr,Arr) => {
    return arr.map((item)=>{
      Arr.forEach((Item)=>{
        if(Item.id === item.id){
          item.shelf = Item.shelf
          return
        }
      })
      return item
    })
  }

  updateQuery = (query) => {
    // const value = event.target.value.trim()
    this.setState({query: query}, this.searchData)
    
  }

  searchData = () => {
    if (this.state.query.length !== 0) {
      BooksAPI.search(this.state.query.trim(), 10).then((books) => {
        if(books.length>0){
          books = this.mergeArr(books,this.props.myBooks)
          this.setState({books})
        }
        else{
          this.setState({books: []})
        }
      })
    } else {
      this.setState({books: [], query: ''})
    }
  }


  render() {
    const books = this.state.books
    const query = this.state.query
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
        {this.state.query !== '' && books.length > 0 && (<BookShelf title="Search Results" books={books} onShelfChange={(id, shelf) => {
          this.props.onShelfChange(id, shelf)
        }}/>)}
      </div>
    )
  }
}

export default SearchBooks;