import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ExpenseReport } from '../expense-report.entity';
import { BankingAccountType } from 'src/shared/types/types';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

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

  @Exclude()
  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.cardEndOfMonthStatement,
  )
  expenseReport: ExpenseReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: Date;
}
