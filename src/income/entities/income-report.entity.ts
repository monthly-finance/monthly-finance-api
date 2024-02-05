import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Month } from 'src/shared/types/types';
import { Entity, Column, OneToMany } from 'typeorm';
import { EmployeeBenefit } from './employee-benefit/employee-benefit.entity';
import { Wage } from './wage.entity';

@Entity()
export class IncomeReport extends BaseMFEntity {
  @Column()
  forMonth: Month;

  @Column()
  forYear: string;

  @OneToMany(() => Wage, (wage) => wage.incomeReport)
  wage: Wage;

  @OneToMany(
    () => EmployeeBenefit,
    (employeeBenefit) => employeeBenefit.incomeReport,
  )
  employeeBenefit: EmployeeBenefit;
}
