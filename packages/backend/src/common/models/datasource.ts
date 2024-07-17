import { DataSource } from 'typeorm';
import { Movement } from './Entity/movements';
import { MovementType } from './Entity/movements-types';
import { Stock } from './Entity/stocks';
import { User } from './Entity/user';
import { Auth } from './Entity/auth';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  synchronize: true,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [MovementType, Movement, Stock, User, Auth],
});
