import {
  readBooksData,
  getBookById,
  writeBookData,
  deleteBookData,
  editBookData,
} from '../utils/booksUtils.js';
import CODES from '../constants/codes.js';
import {
  ServerError,
  NotFoundError,
  BadRequestError,
} from '../errors/errors.js';

const getBooks = async (req, res, next) => {
  try {
    const allBooks = await readBooksData();
    res.status(CODES.OK_CODE).send(allBooks);
  } catch (e) {
    next(new ServerError(e));
  }
};

const getBook = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    const allBooks = await readBooksData();
    const searchedBook = getBookById(allBooks, bookId);
    if (searchedBook) {
      res.status(CODES.OK_CODE).send(searchedBook);
    } else {
      next(new NotFoundError());
    }
  } catch (e) {
    next(new ServerError(e));
  }
};

const createBook = async (req, res, next) => {
  try {
    const { title, description, authors, cover } = req.body;
    if (title && description && authors && cover) {
      const newBook = {
        id: new Date().getTime(),
        // Это не очень хорошо
        // но в бд ObjectId будет сам генерироваться
        title,
        description,
        authors,
        cover,
      };
      writeBookData(newBook)
        .then(() => res.status(CODES.CREATED_CODE).send(newBook))
        .catch((e) => next(new ServerError(e)));
    } else {
      next(new BadRequestError());
    }
  } catch (e) {
    next(new ServerError(e));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    const allBooks = await readBooksData();
    const deletedBook = getBookById(allBooks, bookId);
    if (deletedBook) {
      deleteBookData(bookId);
      res.status(CODES.OK_CODE).send('OK');
    } else {
      next(new NotFoundError());
    }
  } catch (e) {
    next(new ServerError(e));
  }
};

const editBook = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    const { title, description, authors, cover } = req.body;
    const allBooks = await readBooksData();
    const editedBook = getBookById(allBooks, bookId);
    if (editedBook) {
      const updatedBookdata = {
        id: bookId,
        title: title || editedBook.title,
        description: description || editedBook.description,
        authors: authors || editedBook.authors,
        cover: cover || editedBook.cover,
      };
      editBookData(bookId, updatedBookdata);
      res.status(CODES.OK_CODE).send(updatedBookdata);
    } else {
      next(new NotFoundError());
    }
  } catch (e) {
    next(new ServerError(e));
  }
};

export { getBooks, getBook, createBook, deleteBook, editBook };
