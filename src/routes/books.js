import express from 'express';
import {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  editBook,
} from '../controllers/books.js';

const booksRoutes = express.Router();

booksRoutes.get('/', getBooks);
booksRoutes.get('/:id', getBook);
booksRoutes.post('/', express.json(), createBook);
booksRoutes.delete('/:id', deleteBook);
booksRoutes.patch('/:id', express.json(), editBook);

export default booksRoutes;
