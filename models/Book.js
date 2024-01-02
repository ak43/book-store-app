const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    category: String,
    price: Number,
    purchasedDate: Date,
    readStatus: String,
    edition: String,
    yearPublished: Number,
    pages: Number
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
