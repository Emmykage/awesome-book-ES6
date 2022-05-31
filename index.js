/* eslint-disable max-classes-per-file */

import {displaySection} from './modules/SPA.js';
import {displayBook, resetInput} from './modules/displayBook.js';
import {storageAvailable} from './modules/localStorage.js'
// import {BookManager } from './modules/bookManager.js';
import { DateTime } from './modules/luxon/src/luxon.js';

// const { DateTime } = require("luxon");



 class Book {
  constructor(title = null, author = null, id = null) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}
class BookManager {
  constructor() {
    this.bookList = null;
  }

  getBooks() {
    this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    return this.bookList;
  }

  saveBooks() {
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
  }

  addBook(title, author) {
    const bookId = Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 5);
    const newBook = new Book(title, author, bookId);
    this.bookList.push(newBook);
    return bookId;
  }

  removeBook(e) {
    // Remove from localStorage
    this.bookList = JSON.parse(localStorage.getItem('bookList'));
    const bookId = e.target.id;
    const filteredBooks = this.bookList.filter((book) => book.id !== bookId);
    localStorage.setItem('bookList', JSON.stringify(filteredBooks));

    // Remove from the Interface (DOM)
    e.target.parentElement.parentElement.remove();
  }
}



 


const bookName = document.getElementById('name');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add');
let books;

const library = new BookManager();

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    books = library.getBooks();
    if (books.length !== 0) {
      books.forEach((book) => displayBook(book.title, book.author, book.id));
    }
  });
  addBtn.addEventListener('click', () => {
    library.getBooks();
    const bookId = library.addBook(bookName.value, bookAuthor.value);
    library.saveBooks();
    displayBook(bookName.value, bookAuthor.value, bookId);
    resetInput();
  });
}


// // Menu links
const menuBtns = document.querySelectorAll('.menuBtn');

menuBtns.forEach((btn) => {
  btn.addEventListener('click', displaySection);
});



// Adding date
const dateContainer = document.querySelector('#date');
const now = DateTime.local();

dateContainer.textContent = `${now}`;
console.log("now");