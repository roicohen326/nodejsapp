import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './entity/User';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,   
  logging: true
});