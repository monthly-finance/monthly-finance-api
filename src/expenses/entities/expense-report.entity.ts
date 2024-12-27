import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  Unique,
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

@Entity()
@Index(
  'ExpenseReport_MonthAndYear_Null_deletedAt',
  ['forMonth', 'forYear', 'user'],
  { unique: true, where: '("deletedAt" IS NULL)' },
)
export class ExpenseReport extends BaseMFEntity {
  @Column()
  forMonth: Month;

  @Column()
  forYear: string;

  @OneToMany(() => Utility, (utilites) => utilites.expenseReport, {
    onDelete: 'CASCADE',
  })
  utilities: Utility[];

  @OneToMany(() => Rent, (u) => u.expenseReport, {
    onDelete: 'CASCADE',
  })
  rent: Rent;

  @OneToMany(
    () => CardEndOfMonthStatement,
    (CardEndOfMonthStatement) => CardEndOfMonthStatement.expenseReport,
    {
      onDelete: 'CASCADE',
    },
  )
  cardEndOfMonthStatement: CardEndOfMonthStatement[];

  @OneToMany(() => OtherExpense, (otherExpense) => otherExpense.expenseReport)
  otherExpense: OtherExpense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
