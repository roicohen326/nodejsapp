import { DataSource } from 'typeorm';
import config from 'config';

export default new DataSource({
  type: 'postgres',
  host: config.get<string>('database.host'),
  port: config.get<number>('database.port'),
  username: config.get<string>('database.username'),
  password: config.get<string>('database.password'),
  database: config.get<string>('database.database'),
  synchronize: false,
  logging: config.get<boolean>('database.logging'),
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migrations/**/*.ts']
});
