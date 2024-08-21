import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DatabaseConfiguration: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  schema: 'public',
  dropSchema: false,
  cache: false,
  migrations: ['dist/modules/shared/infra/migrations/*.{js,ts}'],
  entities: ['dist/modules/**/infra/models/*.{js,ts}'],
  synchronize: false,
};

export const DatabaseDataSource = new DataSource(DatabaseConfiguration as any);
