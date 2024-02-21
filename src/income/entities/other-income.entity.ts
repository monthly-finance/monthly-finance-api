import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Paycheck } from './paycheck.entity';
import { IncomeReport } from './income-report.entity';
import { OtherIncomeType } from 'src/shared/types/types';

@Entity()
export class OtherIncome extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  type: OtherIncomeType;

  @Column()
  amount: number;

  @ManyToOne(() => IncomeReport, (ir) => ir.otherIncome)
  incomeReport: IncomeReport;
}
