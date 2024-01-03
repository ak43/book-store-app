const mongoose = require('mongoose');
const Book = require('../models/Book');
const User = require('../models/User');

// Used databaseConfig.js for DB connection string
/*
try {
    mongoose.connect("mongodb+srv://********:*********@cluster0.mugeocx.mongodb.net/bookstore?retryWrites=true&w=majority");
} catch (error) {
    console.log(error);
}
*/

//@desc getAllBooks 
//@route /api/books 
//@access public 
const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json([{ message: 'Getting all books' }, books]);
};


//@desc get book by id
//@route /api/books/:id
//@access public
const getBookById = async (req, res) => {
    const bookToFind = await Book.findById(req.params.id);
    res.json(bookToFind);
    // res.json({ message: "Get a Book by its ID" });
};

//@desc save new book
//@route /api/books
//@access public
const saveBook = async (req, res) => {
    // res.json({ message: 'New Book Added' });
    const { id, title, author, category } = req.body;
    if (!title || !author) {
        throw new Error("All fields should be filled");
    }
    const book = new Book({
        title: title,
        author: author,
        category: category
    })
    const result = await book.save();
    res.status(201).json({ message: "New book is added....." + book.title });
}

//@desc update book by its id
//@route /api/books/:id
//@access public
const updateBook = async (req, res) => {
    const id = req.params.id;
    console.log("id ....... " + id);
    const bookToUpdate = Book.findById(id);
    const { title, author, category } = req.body;

    if (title != "") {
        bookToUpdate.title = title;
    }
    if (author !== "") {
        bookToUpdate.author = author;
    }
    if (bookToUpdate.category !== "") {
        bookToUpdate.category = category;
    }

    // Syntax: Model.update({filter}, {update}, callback)
    const result = await Book.updateOne({ _id: id },
        { title: bookToUpdate.title, author: bookToUpdate.author, category: bookToUpdate.category });

    if (result.acknowledged && result.modifiedCount > 0) {
        res.json('Document Update Successful');
    } else {
        res.status(500).send('ERROR updating a document');
    }
}


//@desc delete book by its id
//@route /api/books/:id
//@access public
const deleteBook = async (req, res) => {
    // const book = await Book.findById(req.params.id);
    const id = req.params.id;
    console.log("Book ID to delete ... " + id);
    const result = await Book.deleteOne({ _id: req.params.id });
    // const result = await Book.deleteOne({ id: req.params.id });
    console.log("result............" + result.acknowledged + " .... documents deleted = " + result.deletedCount);
    if (result.acknowledged && result.deletedCount > 0) {
        res.json({ message: "A book with id " + req.params.id + " is deleted..." });
        // res.append(result);
        console.log("1111111111111111");
    }
}


// Get book by its title
const getBookByTitle = async (req, res) => {
    const bookTitle = req.params.title;
    const book = await Book.find({ title: bookTitle });
    console.log('Book found: ' + book);
    res.json([{ message: "Result of Book Query with title... " }, book]);
    // res.write(JSON.stringify(book));
    res.end();
}

const getBookByAuthor = async (req, res) => {
    const auth = req.params.author;
    const book = await Book.find({ author: auth });
    console.log('Book found: ' + book);
    res.json([{ message: "Result of Book Query with Author... " }, book]);
    // res.write(JSON.stringify(book));
    res.end();
}
module.exports = { getBooks, getBookById, saveBook, updateBook, deleteBook, getBookByTitle, getBookByAuthor };

