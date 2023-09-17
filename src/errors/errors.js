import CODES from '../constants/codes.js';

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.BAD_REQUEST_CODE;
    this.message = 'Не все поля есть в запросе';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.NOT_FOUND_CODE;
    this.message = this.message || 'Ресурс не найден';
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.SERVER_ERROR_CODE;
  }
}

export { BadRequestError, NotFoundError, ServerError };
