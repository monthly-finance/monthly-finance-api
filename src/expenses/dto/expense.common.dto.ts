import { BankingAccountType, Month } from 'src/shared/types/types';
import { BankEndOfMonthStatement } from '../entities/banking/bank-statement.entity';
import { Rent } from '../entities/rent.entity';
import { Utility } from '../entities/utilities.entity.ts/utility.entity';
import { UtilityType } from '../entities/utilities.entity.ts/utility-type.entity';

// TODO: need CRUD
export class ExpenseReportDto {
  forMonth: Month;

  forYear: string;

  utilities: Utility[];

  rent: Rent;

  bankEndOfMonthStatement: BankEndOfMonthStatement[];
}

export class UtilityDto {
  amount: number;

  type: UtilityType;
}

// TODO: need CRUD
export class UtilityTypeDto {
  name: number;
}

export class RentDto {
  amount: number;

  rentor: string;
}

export class BankEndOfMonthStatementDto {
  bank: BankDto;

  amount: number;

  isPayed: boolean;
}

// TODO: need CRUD
export class BankDto {
  bankName: string;

  accountType: BankingAccountType;

  isActive: boolean;
}
