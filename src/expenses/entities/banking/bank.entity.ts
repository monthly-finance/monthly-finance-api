import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { CardEndOfMonthStatement } from './card-statement.entity';
import { BankingAccountType } from 'src/shared/types/types';

@Entity()
export class Bank extends BaseMFEntity {
  @Column()
  bankName: string;

  @Column()
  accountType: BankingAccountType;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => CardEndOfMonthStatement,
    (CardEndOfMonthStatement) => CardEndOfMonthStatement.bank,
  )
  cardEndOfMonthStatement: CardEndOfMonthStatement[];
}
