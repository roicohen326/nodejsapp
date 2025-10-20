import config from './config/config';
import { AppDataSource } from './config/database';
import app from './app';

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(config.port, () => {
      console.log(`API running at http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Error initializing DB:', err);
    process.exit(1);
  }
};
  
startServer(); ``