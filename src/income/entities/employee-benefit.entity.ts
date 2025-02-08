import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { User } from 'src/user/entities/user.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class EmployeeBenefit extends BaseMFEntity {
  @ApiProperty({
    description: 'The date when the employee benefit was paid',
    example: '2025-01-05T12:29:43.000Z',
    type: String,
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datePayed?: string;

  @ApiProperty({
    description: 'The amount of the employee benefit',
    example: 200.0,
  })
  @Column()
  amount: number;

  @ApiProperty({
    description: 'The type of the employee benefit',
    example: 'Health Insurance',
  })
  @Column()
  type: string;

  @Exclude()
  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.employeeBenefit)
  incomeReport: IncomeReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: string;
}
