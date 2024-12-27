import { Column, Entity, ManyToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class Rent extends BaseMFEntity {
  @Column()
  rentAmount: number;

  @Column()
  rentor: string;

  @ManyToOne(() => ExpenseReport, (u) => u.rent, { cascade: true })
  expenseReport?: ExpenseReport;
}
