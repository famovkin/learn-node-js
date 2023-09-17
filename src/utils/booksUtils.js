import fs from 'fs';
import path from 'path';
const PATH_TO_FAKE_DB = path.join('src', 'books.json');

const getBookById = (booksArray, searchedId) => {
  return booksArray.find((bookData) => bookData.id === searchedId);
};

const readBooksData = () => {
  return new Promise((resolve, reject) => {
    let readStream = fs.createReadStream(PATH_TO_FAKE_DB, 'utf-8');
    let data = '';
    readStream.on('data', (chunk) => (data += chunk));
    readStream.on('end', () => resolve(JSON.parse(data)));
    readStream.on('error', (e) => reject(`Ошибка при чтении файла ${e}`));
  });
};

const updateJson = (newData, successCb) => {
  const writeStream = fs.createWriteStream(PATH_TO_FAKE_DB);
  writeStream.write(JSON.stringify(newData));
  writeStream.on('error', (e) => reject(`Ошибка при записи файла ${e}`));
  writeStream.end(successCb);
};

const writeBookData = (newBookData) => {
  return new Promise((resolve, reject) => {
    readBooksData()
      .then((parsedData) => {
        const updatedData = [...parsedData, newBookData];
        updateJson(updatedData, resolve);
      })
      .catch(reject);
  });
};

const deleteBookData = (deletedBookId) => {
  return new Promise((resolve, reject) => {
    readBooksData()
      .then((parsedData) => {
        const updatedData = parsedData.filter(
          (book) => book.id !== deletedBookId
        );
        updateJson(updatedData, resolve);
      })
      .catch(reject);
  });
};

const editBookData = (editedBookId, newBookData) => {
  return new Promise((resolve, reject) => {
    readBooksData()
      .then((parsedData) => {
        const updatedData = parsedData.map((book) => {
          if (book.id === editedBookId) return newBookData;
          return book;
        });
        updateJson(updatedData, resolve);
      })
      .catch(reject);
  });
};

export {
  readBooksData,
  getBookById,
  writeBookData,
  deleteBookData,
  editBookData,
};
