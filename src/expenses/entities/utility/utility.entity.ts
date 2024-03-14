import { Entity, Column, ManyToOne } from 'typeorm';
import { ExpenseReport } from '../expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class Utility extends BaseMFEntity {
  @Column()
  amount: number;

  @Column()
  type: string;

  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.utilities,
    {},
  )
  expenseReport: ExpenseReport;
}
