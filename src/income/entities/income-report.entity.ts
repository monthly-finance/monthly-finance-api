import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Month } from 'src/shared/types/types';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeBenefit } from './employee-benefit/employee-benefit.entity';
import { Paycheck } from './paycheck.entity';
import { OtherIncome } from './other-income.entity';

@Entity()
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
