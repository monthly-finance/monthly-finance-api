import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const getDatabaseOptions = (): TypeOrmModuleOptions & DataSourceOptions => {
  if (process.env.MODE == 'DEV') {
    return {
      type: 'postgres',
      host: `/cloudsql/${process.env.POSTGRES_INSTANCE_CONNECTION_NAME}`,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
      logging: true,
      autoLoadEntities: true,
    };
  } else {
    return {
      type: 'postgres',
      host: process.env.LOCAL_POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.LOCAL_POSTGRES_USER,
      password: `${process.env.LOCAL_POSTGRES_PASSWORD}`,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
      logging: true,
      autoLoadEntities: true,
    };
  }
};

export const databaseConfig = registerAs('database', getDatabaseOptions);
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: `${process.env.LOCAL_POSTGRES_USER}`,
  password: `${process.env.LOCAL_POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DATABASE}`,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
  logging: true,
  // autoLoadEntities: true,
});
export default dataSource;

// export const dataSourceOptions: DataSourceOptions & TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.INSTANCE_CONNECTION_NAME ?? 'localhost',
//   port: parseInt(process.env.POSTGRES_PORT),
//   username: `${process.env.POSTGRES_USER}`,
//   password: `${process.env.POSTGRES_PASSWORD}`,
//   database: `${process.env.POSTGRES_DATABASE}`,
//   entities: ['dist/**/*.entity.js'],
//   synchronize: true,
//   migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
//   logging: true,
//   // ----
//   // type: "postgres",
//   //     host: `/cloudsql/INSTANCE_CONNECTION_NAME/.s.PGSQL.5432`,
//   //     extra: {
//   //          socketPath: /cloudsql/project:region:instance
//   //     },
//   //     username: username,
//   //     password: password,
//   //     database: database,
//   //     entities: [
//   //         "dist/models/*.js"
//   //     ],
//   //     synchronize: true,
//   //     logging: false
// };

// const localEnv = (config: ConfigService): TypeOrmModuleOptions => {
//   return {
//     type: 'postgres',
//     host: config.get('LOCAL_POSTGRES_HOST'),
//     port: config.get('POSTGRES_PORT'),
//     username: config.get('LOCAL_POSTGRES_USER'),
//     password: config.get('LOCAL_POSTGRES_PASSWORD'),
//     database: config.get('POSTGRES_DATABASE'),
//     entities: ['dist/**/*.entity.js'],
//     synchronize: true,
//     migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
//     logging: true,
//     autoLoadEntities: true,
//   };
// };
