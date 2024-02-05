import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class Wage extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @OneToOne(() => IncomeReport, (incomeReport) => incomeReport.wage)
  incomeReport: Wage;
}
