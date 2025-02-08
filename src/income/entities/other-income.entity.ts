import { Entity, Column, ManyToOne } from 'typeorm';
import { IncomeReport } from './income-report.entity';
import { OtherIncomeType } from 'src/shared/types/types';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';

@Entity()
export class OtherIncome extends BaseMFEntity {
  @ApiProperty({
    description: 'The date when the other income was received',
    example: '2025-01-05T12:29:43.000Z',
    type: String,
  })
  @Column()
  datePayed: string;

  @ApiProperty({
    description: 'The type/category of the other income',
    enum: OtherIncomeType,
    example: OtherIncomeType.BONUS,
  })
  @Column()
  type: OtherIncomeType;

  @ApiProperty({
    description: 'The amount of the other income',
    example: 500.0,
  })
  @Column()
  amount: number;

  @Exclude()
  @ManyToOne(() => IncomeReport, (ir) => ir.otherIncome)
  incomeReport: IncomeReport;

  @Exclude()
  user: User;

  @Exclude()
  deletedAt?: string;
}
