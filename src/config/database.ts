import { DataSource } from 'typeorm';
import config from './config';

export const AppDataSource = new DataSource(config.typeorm);

export const initializeDatabase = async (): Promise<DataSource> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
    return AppDataSource;
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
};

export default AppDataSource;