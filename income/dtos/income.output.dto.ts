import { IncomeReportDto } from './income.common.dto';

export class IncomeReportOutput extends IncomeReportDto {
  id: string;
}

export class FindAllIncomeReportOutput {
  reports: IncomeReportOutput[];
}
