import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBenefit } from './entities/employee-benefit.entity';
import { IncomeReport } from './entities/income-report.entity';
import { OtherIncome } from './entities/other-income.entity';
import { UserModule } from 'src/user/user.module';
import { IncomeReportController } from './income-report.controller';
import { Paycheck } from './entities/paycheck.entity';
import { User } from 'src/user/entities/user.entity';
import { EmployeeBenefitService } from './employee-benefit.service';
import { IncomeReportService } from './income-report.service';
import { OtherIncomeService } from './other-income.service';
import { PaycheckService } from './paycheck.service';

@Module({
  providers: [
    IncomeReportService,
    PaycheckService,
    EmployeeBenefitService,
    OtherIncomeService,
  ],
  controllers: [IncomeReportController],
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
