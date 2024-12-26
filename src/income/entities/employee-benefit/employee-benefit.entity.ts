import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from '../income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { User } from 'src/user/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class EmployeeBenefit extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Exclude()
  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.employeeBenefit)
  incomeReport: IncomeReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: Date;
}
