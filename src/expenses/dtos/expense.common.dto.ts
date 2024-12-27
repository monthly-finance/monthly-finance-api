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

export class OtherExpenseDto {
  @ApiProperty({ example: '2024-02-10T10:07:58.767Z' })
  datePayed: Date;

  @ApiProperty({ example: 'debt re-payment' })
  type: string;

  @ApiProperty({ example: 3000 })
  amount: number;
}

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

export class ExpenseReportDto {
  @ApiProperty({ enum: Month })
  forMonth: Month;

  @ApiProperty({ example: '1000' })
  forYear: string;
}
