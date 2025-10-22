import { DataSource } from 'typeorm';
import config from './config';

export const AppDataSource = new DataSource(config.typeorm);

export default AppDataSource;