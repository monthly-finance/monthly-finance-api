import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Month } from 'src/shared/types/types';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { EmployeeBenefit } from './employee-benefit.entity';
import { Paycheck } from './paycheck.entity';
import { OtherIncome } from './other-income.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(
  'IncomeReport_MonthAndYear_Null_deletedAt',
  ['forMonth', 'forYear', 'user'],
  { unique: true, where: '("deletedAt" IS NULL)' },
)
export class IncomeReport extends BaseMFEntity {
  @ApiProperty({
    description: 'Month for which the income report is generated',
    example: Month.JANUARY,
    enum: Month,
  })
  @Column()
  forMonth: Month;

  @ApiProperty({
    description: 'Year for which the income report is generated',
    example: '2025',
  })
  @Column()
  forYear: string;

  @ApiProperty({
    description: 'List of paychecks associated with the income report',
    type: () => [Paycheck],
  })
  @OneToMany(() => Paycheck, (paycheck) => paycheck.incomeReport)
  paycheck: Paycheck[];

  @ApiProperty({
    description: 'List of other incomes associated with the income report',
    type: () => [OtherIncome],
  })
  @OneToMany(() => OtherIncome, (oi) => oi.incomeReport)
  otherIncome: OtherIncome[];

  @ApiProperty({
    description: 'List of employee benefits associated with the income report',
    type: () => [EmployeeBenefit],
  })
  @OneToMany(
    () => EmployeeBenefit,
    (employeeBenefit) => employeeBenefit.incomeReport,
  )
  employeeBenefit: EmployeeBenefit[];

  @ApiProperty({
    description: 'Timestamp when the income report was created',
    example: '2025-01-05T12:29:43.000Z',
    type: String,
  })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({
    description: 'Timestamp when the income report was last updated',
    example: '2025-01-05T12:29:43.000Z',
    type: String,
  })
  @UpdateDateColumn()
  updatedAt: string;
}
