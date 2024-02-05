import { Entity, Column, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { IncomeReport } from '../income-report.entity';
import { EmployeeBenefitType } from './employee-benefit-type.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class EmployeeBenefit extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @ManyToOne(
    () => EmployeeBenefitType,
    (employeeBenefitType) => employeeBenefitType.employeeBenefitype,
  )
  employeeBenefitType: EmployeeBenefitType;

  @OneToMany(() => IncomeReport, (incomeReport) => incomeReport.employeeBenefit)
  incomeReport: IncomeReport;
}
