import { ExpenseReportDto } from './expense.common.dto';

export class CreateExpenseReportInput extends ExpenseReportDto {}
export class UpsertExpenseReportInput extends ExpenseReportDto {}
export class DeleteExpenseReportInput {
  id: string;
}
