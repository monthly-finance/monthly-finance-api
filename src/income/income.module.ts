import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBenefit } from './entities/employee-benefit/employee-benefit.entity';
import { IncomeReport } from './entities/income-report.entity';
import { OtherIncome } from './entities/other-income.entity';
import { UserModule } from 'src/user/user.module';
import { IncomeReportService } from './income-report/income-report.service';
import { PaycheckService } from './paycheck/paycheck.service';
import { PaycheckController } from './paycheck/paycheck.controller';
import { EmployeeBenefitController } from './employee-benefit/employee-benefit.controller';
import { EmployeeBenefitService } from './employee-benefit/employee-benefit.service';
import { OtherIncomeService } from './other-income/other-income.service';
import { OtherIncomeController } from './other-income/other-income.controller';
import { IncomeReportController } from './income-report/income-report.controller';
import { Paycheck } from './entities/paycheck.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [
    IncomeReportService,
    PaycheckService,
    EmployeeBenefitService,
    OtherIncomeService,
  ],
  controllers: [
    PaycheckController,
    EmployeeBenefitController,
    OtherIncomeController,
    IncomeReportController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      EmployeeBenefit,
      IncomeReport,
      OtherIncome,
      Paycheck,
      User,
    ]),
    UserModule,
  ],
})
export class IncomeModule {}
