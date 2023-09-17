import exress from 'express';
import booksRoutes from './books.js';
import usersRoutes from './users.js';
import { NotFoundError } from '../errors/errors.js';

const routes = exress.Router();

routes.use('/api/books', booksRoutes);
routes.use('/api/login', usersRoutes);
routes.use('*', () => {
  throw new NotFoundError('Страница не найдена. Проверьте URL');
});

export default routes;
