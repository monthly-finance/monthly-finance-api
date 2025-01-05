import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OtherExpense extends BaseMFEntity {
  @Column()
  @ApiProperty({
    description: 'The date when the expense was paid',
    example: '2025-01-05T12:42:30.000Z',
    type: Date,
  })
  datePayed: Date;

  @Column()
  @ApiProperty({
    description: 'The type or category of the expense',
    example: 'Office Supplies',
  })
  type: string;

  @Column()
  @ApiProperty({
    description: 'The amount of the expense',
    example: 150.75,
  })
  amount: number;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.otherExpense)
  @Exclude()
  expenseReport: ExpenseReport;
}
