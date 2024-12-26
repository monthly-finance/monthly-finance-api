import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Paycheck extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  amount: number;

  @Exclude()
  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.paycheck)
  incomeReport: IncomeReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: Date;
}
