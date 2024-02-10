import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEndOfMonthStatement } from './entities/banking/card-statement.entity';
import { Bank } from './entities/banking/bank.entity';
import { UtilityType } from './entities/utilities.entity.ts/utility-type.entity';
import { Utility } from './entities/utilities.entity.ts/utility.entity';
import { ExpenseReport } from './entities/expense-report.entity';
import { Rent } from './entities/rent.entity';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ExpensesService, UserService],
  controllers: [ExpensesController],
  imports: [
    TypeOrmModule.forFeature([
      BankEndOfMonthStatement,
      Bank,
      UtilityType,
      Utility,
      ExpenseReport,
      Rent,
    ]),
  ],
})
export class ExpensesModule {}
