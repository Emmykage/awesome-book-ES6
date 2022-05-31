/* eslint-disable max-classes-per-file */

import displaySection from './modules/SPA.js';
import { displayBook, resetInput } from './modules/displayBook.js';
import storageAvailable from './modules/localStorage.js';
import { DateTime } from './modules/luxon.js';
import BookManager from './modules/bookManager.js';

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
const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
dateContainer.textContent = `${now}`;
