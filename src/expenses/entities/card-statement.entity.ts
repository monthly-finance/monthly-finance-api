import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BankingAccountType } from 'src/shared/types/types';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { ExpenseReport } from './expense-report.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CardEndOfMonthStatement extends BaseMFEntity {
  @Column()
  @ApiProperty({
    description: 'Name of the bank issuing the card',
    example: 'Bank of America',
  })
  bankName: string;

  @Column()
  @ApiProperty({
    enum: BankingAccountType,
    description: 'Type of banking account associated with the card',
    example: BankingAccountType.CREDIT,
  })
  accountType: BankingAccountType;

  @Column()
  @ApiProperty({
    description: 'Statement amount for the end of the month',
    example: 1500.75,
  })
  amount: number;

  @Column()
  @ApiProperty({
    description: 'Indicates whether the statement has been paid',
    example: true,
  })
  isPayed: boolean;

  @ManyToOne(
    () => ExpenseReport,
    (expenseReport) => expenseReport.cardEndOfMonthStatement,
    { cascade: true },
  )
  @Exclude()
  expenseReport: ExpenseReport;

  @ManyToOne(() => User)
  @Exclude()
  user: User;

  @Exclude()
  @ApiProperty({
    description: 'Timestamp when the record was deleted, if applicable',
    type: Date,
    required: false,
  })
  deletedAt?: Date;
}
