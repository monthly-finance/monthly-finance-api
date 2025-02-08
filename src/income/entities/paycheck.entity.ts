import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Paycheck extends BaseMFEntity {
  @ApiProperty({
    description: 'The date when the paycheck was issued',
    example: '2025-01-05T12:29:43.000Z',
    type: String,
  })
  @Column()
  datePayed: string;

  @ApiProperty({
    description: 'The amount of the paycheck',
    example: 1500.0,
  })
  @Column()
  amount: number;

  @Exclude()
  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.paycheck)
  incomeReport: IncomeReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: string;
}
