import { Entity, Column, OneToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class Rent extends BaseMFEntity {
  @Column()
  amount: number;

  @Column()
  rentor: string;

  @OneToOne(() => ExpenseReport, (expenseReport) => expenseReport.rent)
  expenseReport: ExpenseReport;
}
