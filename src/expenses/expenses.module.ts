import { Module } from '@nestjs/common';
import { ExpenseReportService } from './services/expense-report.service';
import { ExpensesController } from './controllers/expense-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEndOfMonthStatement } from './entities/banking/card-statement.entity';
import { Utility } from './entities/utility/utility.entity';
import { ExpenseReport } from './entities/expense-report.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UtilityService } from './services/utility.service';
import { CardStatementService } from './services/card-statement.service';
import { CardStatementController } from './controllers/card-statement.controller';
import { UtilityController } from './controllers/utility.controller';
import { Rent } from './entities/rent.entity';
import { RentController } from './controllers/rent.controller';
import { RentService } from './services/rent.service';

@Module({
  providers: [
    ExpenseReportService,
    UtilityService,
    CardStatementService,
    RentService,
  ],
  controllers: [
    ExpensesController,
    CardStatementController,
    UtilityController,
    RentController,
  ],

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
