import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomeModule } from './income/income.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';
import { UtilityService } from './src/expenses/services/utility/utility.service';

@Module({
  imports: [
    ExpensesModule,
    IncomeModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    IncomeModule,
    ExpensesModule,
    UserModule,
  ],
  providers: [UtilityService],
})
export class AppModule {}
