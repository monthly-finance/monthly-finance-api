import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from '../income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class EmployeeBenefit extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @Column()
  type: string;

  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.employeeBenefit)
  incomeReport: IncomeReport;
}
