import 'reflect-metadata';
import { AppDataSource } from './data-source';
import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error initializing DB:', err);
    process.exit(1);
  }
};

startServer();