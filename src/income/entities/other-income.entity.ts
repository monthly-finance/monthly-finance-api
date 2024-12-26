import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { OtherIncomeType } from 'src/shared/types/types';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class OtherIncome extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  type: OtherIncomeType;

  @Column()
  amount: number;

  @Exclude()
  @ManyToOne(() => IncomeReport, (ir) => ir.otherIncome)
  incomeReport: IncomeReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: Date;
}
