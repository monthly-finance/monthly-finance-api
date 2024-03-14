import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.INSTANCE_CONNECTION_NAME ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DATABASE}`,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
  logging: true,
  // ----
  // type: "postgres",
  //     host: `/cloudsql/INSTANCE_CONNECTION_NAME/.s.PGSQL.5432`,
  //     extra: {
  //          socketPath: /cloudsql/project:region:instance
  //     },
  //     username: username,
  //     password: password,
  //     database: database,
  //     entities: [
  //         "dist/models/*.js"
  //     ],
  //     synchronize: true,
  //     logging: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
