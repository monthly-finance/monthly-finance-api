import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [ExpensesModule, IncomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
