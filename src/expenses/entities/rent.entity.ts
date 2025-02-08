import { Column, Entity, ManyToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Rent extends BaseMFEntity {
  @Column()
  @ApiProperty({
    description: 'The amount of rent paid',
    example: 1200.0,
  })
  amount: number;

  @Column()
  @ApiProperty({
    description: 'The name of the landlord or renting entity',
    example: 'John Doe',
  })
  rentor: string;

  @ManyToOne(() => ExpenseReport, (expenseReport) => expenseReport.rent)
  @Exclude()
  expenseReport?: ExpenseReport;

  @ManyToOne(() => User)
  @Exclude()
  user: User;

  @Exclude()
  @ApiProperty({
    description: 'The date when the rent record was deleted, if applicable',
    example: '2025-01-05T12:29:43.000Z',
    required: false,
    type: String,
  })
  deletedAt?: string;
}
