import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomeModule } from './income/income.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ExpensesModule,
    IncomeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      migrations: [join(__dirname, 'migrations', '*.{ts,js}')], // Path to your migrations folder
    }),
    IncomeModule,
    ExpensesModule,
  ],
})
export class AppModule {}
