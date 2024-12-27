import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BankingAccountType } from 'src/shared/types/types';
import { ExpenseReport } from './expense-report.entity';

@Entity()
export class CardEndOfMonthStatement extends BaseMFEntity {
  @Column()
  bankName: string;

  @Column()
  accountType: BankingAccountType;

  @Column()
  amount: number;

  @Column()
  isPayed: boolean;

  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.cardEndOfMonthStatement,
    { cascade: true },
  )
  expenseReport: ExpenseReport;
}
