import express from 'express';
import routes from './routes/index.js';

const PORT = 3000;
const app = express();

app.use(routes);
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message: message });
  next();
});

const startApp = () => {
  app.listen(PORT, () => console.log(`App linstening on port: ${PORT}`));
};

startApp();
