import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ExpenseReport } from '../expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Utility } from './utility.entity';

@Entity()
export class UtilityType extends BaseMFEntity {
  @Column()
  name: number;

  @OneToMany(() => Utility, (utility) => utility.type)
  utility: Utility;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.utilities)
  expenseReport: ExpenseReport;
}

// export enum UtilityType {
//   GAS = 'GAS',
//   ELECTRIC = 'ELECTRIC',
//   INTERNET = 'INTERNET',
//   WATER = 'WATER',
//   OTHER = 'OTHER',
// }
