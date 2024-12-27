import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class OtherExpense extends BaseMFEntity {
  @Column()
  datePayed: Date;

  //TODO: think about if this should be an enum like other-income
  @Column()
  type: string;
  @Column()
  amount: number;

  @Exclude()
  @ManyToOne(() => ExpenseReport, (er) => er.otherExpense)
  expenseReport: ExpenseReport;
}
