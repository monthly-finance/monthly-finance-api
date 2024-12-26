import { Entity, Column, ManyToOne } from 'typeorm';
import { ExpenseReport } from '../expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Utility extends BaseMFEntity {
  @Column()
  amount: number;

  @Column()
  type: string;

  @Exclude()
  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.utilities,
    {},
  )
  expenseReport: ExpenseReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: Date;
}
