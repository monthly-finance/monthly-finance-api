import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Wage } from './wage.entity';
import { IncomeReport } from './income-report.entity';

@Entity()
export class OtherIncome extends BaseMFEntity {
  @Column()
  datePayed: Date;

  @Column()
  type: OtherIncomeType;

  @Column()
  amount: number;

  @ManyToOne(() => IncomeReport, (incomeReport) => incomeReport.wage)
  incomeReport: Wage;
}

enum OtherIncomeType {
  BONUS = 'BONUS',
  INVESTMENT_INCOME = 'INVESTMENT INCOME',
  FREELANCE = 'FREELANCE INCOME',
  BUSINESS = 'BUSINESS INCOME',
  INTEREST = 'INTEREST INCOME',
  DIVIDENDS = 'DIVIDEND INCOME',
  PENSION = 'PENSION',
  SOCIAL_SECURITY = 'SOCIAL SECURITY',
  VENMO = 'VENMO',
  BANK_TRANSFER = 'BANK TRANSFER',
  OTHER = 'OTHER INCOME',
}
