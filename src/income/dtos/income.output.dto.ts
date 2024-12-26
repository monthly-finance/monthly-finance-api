import { User } from 'src/user/entities/user.entity';
import { EmployeeBenefit } from '../entities/employee-benefit/employee-benefit.entity';
import { IncomeReportDto } from './income.common.dto';
import { Exclude } from 'class-transformer';

export class IncomeReportOutput extends IncomeReportDto {
  id: string;
}

export class FindAllIncomeReportOutput {
  reports: IncomeReportOutput[];
}

export class EmployeeBenefitOutput extends EmployeeBenefit {
  @Exclude()
  user: User;
  @Exclude()
  id: number;
}
