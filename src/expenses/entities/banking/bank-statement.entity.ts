import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Bank } from './bank.entity';
import { ExpenseReport } from '../expense-report.entity';

@Entity()
export class BankEndOfMonthStatement extends BaseMFEntity {
  @ManyToOne(() => Bank, (bank) => bank.bankEndOfMonthStatement)
  bank: Bank;

  @Column()
  amount: number;

  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.bankEndOfMonthStatement,
  )
  expenseReport: ExpenseReport;

  @Column()
  isPayed: boolean;
}
