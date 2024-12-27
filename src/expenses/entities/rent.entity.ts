import { Column, Entity, ManyToOne } from 'typeorm';
import { ExpenseReport } from './expense-report.entity';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Rent extends BaseMFEntity {
  @Column()
  rentAmount: number;

  @Column()
  rentor: string;

  @Exclude()
  @ManyToOne(() => ExpenseReport, (u) => u.rent)
  expenseReport?: ExpenseReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: Date;
}
