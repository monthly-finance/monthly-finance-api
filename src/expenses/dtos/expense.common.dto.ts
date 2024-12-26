import { BankingAccountType, Month } from 'src/shared/types/types';
import { ApiProperty } from '@nestjs/swagger';

// TODO: need CRUD
// export class UtilityTypeDto {
//   @ApiProperty({ example: 'water' })
//   name: string;
// }

export class UtilityDto {
  @ApiProperty({ example: 20 })
  amount: number;

  @ApiProperty({ example: 'water' })
  type: string;
}

export class RentDto {
  @ApiProperty({ example: 2000 })
  amount: number;

  @ApiProperty({ example: 'MAA' })
  rentor: string;
}

// TODO: need CRUD
// export class BankDto {
//   @ApiProperty({ example: 'Truist' })
//   bankName: string;

//   @ApiProperty({ enum: BankingAccountType })
//   accountType: BankingAccountType;

//   @ApiProperty({ example: true })
//   isActive: boolean;
// }

export class CardEndOfMonthStatementDto {
  @ApiProperty({ example: 'Truist' })
  bankName: string;

  @ApiProperty({ enum: BankingAccountType })
  accountType: BankingAccountType;

  @ApiProperty({ example: 1500 })
  amount: number;

  @ApiProperty({ example: true })
  isPayed: boolean;
}

// TODO: need CRUD
export class ExpenseReportDto {
  @ApiProperty({ enum: Month })
  forMonth: Month;

  @ApiProperty({ example: '1000' })
  forYear: string;
}
