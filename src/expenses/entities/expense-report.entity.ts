import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Utility } from './utilities.entity.ts/utility.entity';
import { Rent } from './rent.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { BankEndOfMonthStatement } from './banking/bank-statement.entity';
import { Month } from 'src/shared/types/types';

@Entity()
export class ExpenseReport extends BaseMFEntity {
  @Column()
  forMonth: Month;

  @Column()
  forYear: string;

  @OneToMany(() => Utility, (utilites) => utilites.expenseReport)
  utilities: Utility[];

  @OneToOne(() => Rent, (rent) => rent.expenseReport)
  rent: Rent;

  @OneToMany(
    () => BankEndOfMonthStatement,
    (bankEndOfMonthStatement) => bankEndOfMonthStatement.expenseReport,
  )
  bankEndOfMonthStatement: BankEndOfMonthStatement[];
}
