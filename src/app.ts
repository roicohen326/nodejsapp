import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json()); 

app.use('/users', userRoutes);

app.use(errorHandler);  

export default app;