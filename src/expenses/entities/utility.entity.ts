import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { ExpenseReport } from './expense-report.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Utility extends BaseMFEntity {
  @Column()
  @ApiProperty({ description: 'The amount of the utility expense' })
  amount: number;

  @Column()
  @ApiProperty({
    description: 'The type of utility expense, e.g., electricity, water',
  })
  type: string;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.utilities, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    type: () => ExpenseReport,
    description: 'The associated expense report',
  })
  expenseReport: ExpenseReport;

  @ManyToOne(() => User)
  @ApiProperty({
    type: () => User,
    description: 'The user associated with this utility expense',
  })
  user: User;

  @Exclude()
  @ApiProperty({
    type: Date,
    description: 'The date when the utility expense was deleted',
    required: false,
  })
  deletedAt?: Date;
}
