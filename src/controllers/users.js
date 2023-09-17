import CODES from '../constants/codes.js';

import { ServerError } from '../errors/errors.js';

const mockData = {
  id: 1,
  mail: 'test@mail.ru',
};

const login = async (req, res, next) => {
  try {
    res.status(CODES.OK_CODE).send(mockData);
  } catch (e) {
    next(new ServerError(e));
  }
};

export { login };
