import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomeModule } from './income/income.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
const devEnv = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: `/cloudsql/${config.get('POSTGRES_INSTANCE_CONNECTION_NAME')}`,
    port: 5432,
    // extra: {
    //   socketPath: `/cloudsql/${config.get(
    //     'POSTGRES_INSTANCE_CONNECTION_NAME',
    //   )}`,
    // },
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DATABASE'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
    logging: true,
  };
};

const localEnv = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: config.get('LOCAL_POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    username: config.get('LOCAL_POSTGRES_USER'),
    password: config.get('LOCAL_POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DATABASE'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/db/migrations/*.js'], // Path to your migrations folder
    logging: true,
  };
};
@Module({
  imports: [
    ConfigModule.forRoot(),
    ExpensesModule,
    IncomeModule,
    // TypeOrmModule.forRoot({
    //   ...dataSourceOptions,
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('MODE') == 'DEV' ? devEnv(config) : localEnv(config);
      },
    }),
    ExpensesModule,
    UserModule,
    AuthModule,
    JwtModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
