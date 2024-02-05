import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { EmployeeBenefit } from './employee-benefit.entity';

@Entity()
export class EmployeeBenefitType extends BaseMFEntity {
  @Column()
  name: string;

  @OneToMany(
    () => EmployeeBenefit,
    (employeeBenefit) => employeeBenefit.employeeBenefitType,
  )
  employeeBenefitype: EmployeeBenefit;
}
