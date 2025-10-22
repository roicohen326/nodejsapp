import express from 'express';
import userRoutes from './routes/userRoutes';
import { getErrorHandlerMiddleware } from '@map-colonies/error-express-handler';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use(getErrorHandlerMiddleware());

export default app;
