import { Module } from '@nestjs/common';
import { ExpenseReportService } from './services/expense-report.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEndOfMonthStatement } from './entities/banking/card-statement.entity';
import { Bank } from './entities/banking/bank.entity';
import { UtilityType } from './entities/utilities.entity.ts/utility-type.entity';
import { Utility } from './entities/utilities.entity.ts/utility.entity';
import { ExpenseReport } from './entities/expense-report.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UtilityService } from './services/utility.service';

@Module({
  providers: [ExpenseReportService, UtilityService],
  controllers: [ExpensesController],
  imports: [
    TypeOrmModule.forFeature([
      CardEndOfMonthStatement,
      Bank,
      UtilityType,
      Utility,
      ExpenseReport,
      User,
    ]),
    UserModule,
  ],
})
export class ExpensesModule {}
