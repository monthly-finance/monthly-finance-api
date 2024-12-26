import { Module } from '@nestjs/common';
import { ExpenseReportService } from './expense-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEndOfMonthStatement } from './entities/banking/card-statement.entity';
import { Utility } from './entities/utility/utility.entity';
import { ExpenseReport } from './entities/expense-report.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UtilityService } from './utility.service';
import { CardStatementService } from './card-statement.service';

import { RentService } from './rent.service';
import { Rent } from './entities/rent.entity';
import { ExpensesController } from './expense-report.controller';

@Module({
  providers: [
    ExpenseReportService,
    UtilityService,
    CardStatementService,
    RentService,
  ],
  controllers: [ExpensesController],

  imports: [
    TypeOrmModule.forFeature([
      CardEndOfMonthStatement,

      Utility,
      ExpenseReport,
      User,
      Rent,
    ]),
    UserModule,
  ],
})
export class ExpensesModule {}
