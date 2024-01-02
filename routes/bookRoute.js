const express = require('express');
const { getBooks, getBookById, saveBook, updateBook, deleteBook, getBookByTitle, getBookByAuthor } = require('../controller/bookController');
const bookRoute = express.Router();

bookRoute.get('/', getBooks);
bookRoute.get('/:id', getBookById);
bookRoute.post('/', saveBook);
bookRoute.put('/:id', updateBook);
bookRoute.delete('/:id', deleteBook);

// Search book using its title
bookRoute.get('/title/:title', getBookByTitle)

// Search book using its author
bookRoute.get('/author/:author', getBookByAuthor)

module.exports = bookRoute; 