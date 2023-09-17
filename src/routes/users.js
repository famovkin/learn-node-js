import express from 'express';
import { login } from '../controllers/users.js';

const usersRoutes = express.Router();

usersRoutes.get('/', login);

export default usersRoutes;
