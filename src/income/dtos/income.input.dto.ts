import { IncomeReportDto } from './income.common.dto';

export class CreateIncomeReportInput extends IncomeReportDto {}
export class UpsertIncomeReportInput extends IncomeReportDto {}
export class DeleteIncomeReportInput {
  id: string;
}
