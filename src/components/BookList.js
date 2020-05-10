import React, { Component } from 'react'
import { Link } from 'react-router-dom'


//Components
import BookShelf from './BookShelf'

class BookList extends Component {
  
  shelfs = [
    {
      name: `currentlyReading`,
      heading: `Currently Reading`
    },
    {
      name: `wantToRead`,
      heading: `Want to Read`
    },
    {
      name: `read`,
      heading: `Read`
    },
  ]

  render(){
    const shelfs = this.shelfs
    const books = this.props.books

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelfs.map((shelf,index)=> (
              <BookShelf
                title={shelf.heading}
                key={index}
                books={books.filter((book) => book.shelf === shelf.name)}
                onShelfChange={(id,shelf)=>{
                  this.props.onShelfChange(id,shelf)
                }}
              />
            )) }
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList;