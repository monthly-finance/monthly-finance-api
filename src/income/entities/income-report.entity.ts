import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Month } from 'src/shared/types/types';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
} from 'typeorm';
import { EmployeeBenefit } from './employee-benefit/employee-benefit.entity';
import { Paycheck } from './paycheck.entity';
import { OtherIncome } from './other-income.entity';

@Entity()
// @Unique('IncomeReport_MonthAndYear', [
//   'forMonth',
//   'forYear',
//   'user',
//   'deletedAt',
// ])
@Index(
  'IncomeReport_MonthAndYear_Null_deletedAt',
  ['forMonth', 'forYear', 'user'],
  { unique: true, where: '("deletedAt" IS NULL)' },
)
export class IncomeReport extends BaseMFEntity {
  @Column()
  forMonth: Month;

  @Column()
  forYear: string;

  @OneToMany(() => Paycheck, (paycheck) => paycheck.incomeReport, {
    // cascade: ['insert', 'update', 'soft-remove'],
  })
  paycheck: Paycheck[];

  @OneToMany(() => OtherIncome, (oi) => oi.incomeReport, {
    // cascade: ['insert', 'update', 'soft-remove'],
  })
  otherIncome: OtherIncome[];

  @OneToMany(
    () => EmployeeBenefit,
    (employeeBenefit) => employeeBenefit.incomeReport,
    // { cascade: ['insert', 'update', 'soft-remove'] },
  )
  employeeBenefit: EmployeeBenefit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
