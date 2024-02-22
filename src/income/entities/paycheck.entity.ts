import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class Paycheck extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.paycheck)
  incomeReport: IncomeReport;
}
