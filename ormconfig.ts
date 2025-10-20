import { DataSource } from 'typeorm';
import config from './src/config/config';

export default new DataSource({
  ...config.typeorm,
  migrations: ['src/migrations/*.ts'],
});