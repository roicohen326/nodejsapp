import express from 'express';
import usersRouter from './routes/users';

const app = express();

app.use(express.json()); // parse JSON requests
app.use('/users', usersRouter);

export default app;