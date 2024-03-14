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
import { Utility } from './utility/utility.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { CardEndOfMonthStatement } from './banking/card-statement.entity';
import { Month } from 'src/shared/types/types';
import { Rent } from './rent.entity';

@Entity()
// @Unique('ExpenseReport_MonthAndYear', [
//   'forMonth',
//   'forYear',
//   'user',
//   'deletedAt',
// ])
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
    // cascade: ['insert', 'update', 'soft-remove'],
    // orphanedRowAction: 'soft-delete',
  })
  utilities: Utility[];

  @OneToMany(() => Rent, (u) => u.expenseReport)
  rent: Rent;

  @OneToMany(
    () => CardEndOfMonthStatement,
    (CardEndOfMonthStatement) => CardEndOfMonthStatement.expenseReport,
    {
      // cascade: ['insert', 'update', 'soft-remove'],
      // orphanedRowAction: 'soft-delete',
    },
  )
  cardEndOfMonthStatement: CardEndOfMonthStatement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
