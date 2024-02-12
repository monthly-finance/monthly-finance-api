import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Utility } from './utilities.entity.ts/utility.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { CardEndOfMonthStatement } from './banking/card-statement.entity';
import { Month } from 'src/shared/types/types';

@Entity()
@Unique('MonthAndYear', ['forMonth', 'forYear'])
export class ExpenseReport extends BaseMFEntity {
  @Column()
  forMonth: Month;

  @Column()
  forYear: string;

  @OneToMany(() => Utility, (utilites) => utilites.expenseReport, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  utilities: Utility[];

  @Column()
  rentAmount: number;

  @Column()
  rentor: string;

  @OneToMany(
    () => CardEndOfMonthStatement,
    (CardEndOfMonthStatement) => CardEndOfMonthStatement.expenseReport,
    { cascade: ['insert', 'update', 'soft-remove'] },
  )
  cardEndOfMonthStatement: CardEndOfMonthStatement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
