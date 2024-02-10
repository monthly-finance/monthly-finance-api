import { ExpenseReportDto } from './expense.common.dto';

export class ExpenseReportOutput extends ExpenseReportDto {
  id: string;
}

export class FindAllExpenseReportOutput {
  reports: ExpenseReportOutput[];
}
