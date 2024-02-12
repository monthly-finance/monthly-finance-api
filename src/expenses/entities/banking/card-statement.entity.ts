import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Bank } from './bank.entity';
import { ExpenseReport } from '../expense-report.entity';

@Entity()
export class CardEndOfMonthStatement extends BaseMFEntity {
  @ManyToOne(() => Bank, (bank) => bank.cardEndOfMonthStatement, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  bank: Bank;

  @Column()
  amount: number;

  @Column()
  isPayed: boolean;

  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.cardEndOfMonthStatement,
  )
  expenseReport: ExpenseReport;
}
