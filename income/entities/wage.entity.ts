import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class Wage extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.wage)
  incomeReport: IncomeReport;
}
