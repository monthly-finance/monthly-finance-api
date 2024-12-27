import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { ExpenseReport } from './expense-report.entity';

@Entity()
export class Utility extends BaseMFEntity {
  @Column()
  amount: number;

  @Column()
  type: string;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.utilities, {
    cascade: true,
  })
  expenseReport: ExpenseReport;
}
