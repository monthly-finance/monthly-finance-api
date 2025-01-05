import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Month } from 'src/shared/types/types';
import { Rent } from './rent.entity';
import { Utility } from './utility.entity';
import { CardEndOfMonthStatement } from './card-statement.entity';
import { OtherExpense } from './other-expense.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(
  'ExpenseReport_MonthAndYear_Null_deletedAt',
  ['forMonth', 'forYear', 'user'],
  { unique: true, where: '("deletedAt" IS NULL)' },
)
export class ExpenseReport extends BaseMFEntity {
  @Column()
  @ApiProperty({ enum: Month, description: 'Month of the expense report' })
  forMonth: Month;

  @Column()
  @ApiProperty({ description: 'Year of the expense report' })
  forYear: string;

  @OneToMany(() => Utility, (utility) => utility.expenseReport, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    type: () => Utility,
    isArray: true,
    description: 'List of utilities associated with the expense report',
  })
  utilities: Utility[];

  @OneToMany(() => Rent, (rent) => rent.expenseReport, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    type: () => Rent,
    isArray: true,
    description: 'List of rent records associated with the expense report',
  })
  rent: Rent[];

  @OneToMany(
    () => CardEndOfMonthStatement,
    (statement) => statement.expenseReport,
    {
      onDelete: 'CASCADE',
    },
  )
  @ApiProperty({
    type: () => CardEndOfMonthStatement,
    isArray: true,
    description: 'List of card end-of-month statements',
  })
  cardEndOfMonthStatement: CardEndOfMonthStatement[];

  @OneToMany(() => OtherExpense, (otherExpense) => otherExpense.expenseReport)
  @ApiProperty({
    type: () => OtherExpense,
    isArray: true,
    description: 'List of other expenses associated with the report',
  })
  otherExpense: OtherExpense[];

  @CreateDateColumn()
  @ApiProperty({
    type: Date,
    description: 'Date when the expense report was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    type: Date,
    description: 'Date when the expense report was last updated',
  })
  updatedAt: Date;
}
