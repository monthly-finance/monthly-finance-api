import { BankingAccountType, Month } from 'src/shared/types/types';
import { BankEndOfMonthStatement } from '../entities/banking/card-statement.entity';
import { Rent } from '../entities/rent.entity';
import { Utility } from '../entities/utilities.entity.ts/utility.entity';
import { UtilityType } from '../entities/utilities.entity.ts/utility-type.entity';
import { ApiProperty } from '@nestjs/swagger';

// TODO: need CRUD
export class UtilityTypeDto {
  name: number;
}

export class UtilityDto {
  @ApiProperty({ example: 20 })
  amount: string;

  @ApiProperty({ type: UtilityTypeDto })
  type: UtilityTypeDto;
}

export class RentDto {
  @ApiProperty({ example: 2000 })
  amount: string;

  @ApiProperty({ example: 'MAA' })
  rentor: string;
}

// TODO: need CRUD
export class BankDto {
  @ApiProperty({ example: 'Truist' })
  bankName: string;

  @ApiProperty({ example: BankingAccountType.CHECKING })
  accountType: BankingAccountType;

  @ApiProperty({ example: true })
  isActive: boolean;
}

export class BankEndOfMonthStatementDto {
  @ApiProperty({ type: BankDto })
  bank: BankDto;

  @ApiProperty({ example: '1500' })
  amount: string;

  @ApiProperty({ example: true })
  isPayed: boolean;
}

// TODO: need CRUD
export class ExpenseReportDto {
  @ApiProperty({ example: 'March' })
  forMonth: Month;

  @ApiProperty({ example: '1000' })
  forYear: string;

  @ApiProperty({ type: [UtilityDto] })
  utilities: UtilityDto[];

  @ApiProperty({ type: RentDto })
  rent: RentDto;

  @ApiProperty({ type: [BankEndOfMonthStatementDto] })
  bankEndOfMonthStatement: BankEndOfMonthStatementDto[];
}
