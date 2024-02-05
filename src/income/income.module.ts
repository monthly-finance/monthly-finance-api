import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBenefitType } from './entities/employee-benefit/employee-benefit-type.entity';
import { EmployeeBenefit } from './entities/employee-benefit/employee-benefit.entity';
import { IncomeReport } from './entities/income-report.entity';
import { OtherIncome } from './entities/other-income.entity';

@Module({
  providers: [IncomeService],
  controllers: [IncomeController],
  imports: [
    TypeOrmModule.forFeature([
      EmployeeBenefitType,
      EmployeeBenefit,
      IncomeReport,
      OtherIncome,
    ]),
  ],
})
export class IncomeModule {}
