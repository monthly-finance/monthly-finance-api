import { Entity, Column, ManyToOne } from 'typeorm';
import { ExpenseReport } from '../expenses.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { UtilityType } from './utility-type.entity';

@Entity()
export class Utility extends BaseMFEntity {
  @Column()
  amount: number;

  @Column()
  type: UtilityType;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.utilities)
  expenseReport: ExpenseReport;
}
