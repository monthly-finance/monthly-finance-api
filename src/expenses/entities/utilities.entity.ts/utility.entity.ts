import { Entity, Column, ManyToOne } from 'typeorm';
import { ExpenseReport } from '../expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { UtilityType } from './utility-type.entity';

@Entity()
export class Utility extends BaseMFEntity {
  @Column()
  amount: number;

  @ManyToOne(() => UtilityType, (type) => type.utility, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  type: UtilityType;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.utilities, {
    onUpdate: 'CASCADE',
  })
  expenseReport: ExpenseReport;
}
