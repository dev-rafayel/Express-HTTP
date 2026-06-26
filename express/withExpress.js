const { PORT } = require('../config.js');
const express = require('express');
const app = express();
app.use(express.json());

const books = require('../booksData.json');

app.get('/books/express', (req, res) => {
  res.json(books);
});

app.get('/books/express/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((bk) => bk.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Could not find the book' });
  }

  res.json(book);
});

app.post('/books/express', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and authors are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  return res.status(201).json({ message: 'The book created successfully' });
});

app.put('/books/express/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((bk) => bk.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Could not found the book' });
  }

  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and authors are required' });
  }

  books[bookIndex].title = title;
  books[bookIndex].author = author;
  return res.json({ message: 'Book updated successfully' });
});

app.patch('books/express/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((bk) => bk.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Could not find the book' });
  }

  const { title, author } = req.body;
  book.author = author;
  book.title = title;
});

app.delete('/books/express/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIdx = books.findIndex((bk) => bk.id === bookId);

  if (bookIdx === -1) {
    return res.status(404).json({ message: 'Could not find the book' });
  }

  books.splice(bookIdx, 1);
  return res.json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
