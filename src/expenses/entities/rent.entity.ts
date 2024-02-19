import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';

Entity();
export class Rent extends BaseEntity {
  @Column()
  rentAmount: number;

  @Column()
  rentor: string;

  @OneToOne(() => ExpenseReport)
  @JoinColumn()
  expenseReport: ExpenseReport;
}
