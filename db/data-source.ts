import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  database: 'monthly_finance',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
