import { Month } from 'src/shared/types/types';
import {
  CardEndOfMonthStatementDto,
  ExpenseReportDto,
  RentDto,
  UtilityDto,
} from './expense.common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseReportInput extends ExpenseReportDto {}
export class UpdateExpenseReportInput extends ExpenseReportDto {
  @ApiProperty()
  reportId: number;
}
export class DeleteExpenseReportInput {
  @ApiProperty()
  reportId: number;
}
export class FindOneExpenseReportInput {
  @ApiProperty({ enum: Month })
  forMonth: Month;

  @ApiProperty({ example: '2001' })
  forYear: string;
}

export class CreateUtilityInput extends UtilityDto {
  @ApiProperty()
  reportId: number;
}
export class UpdateUtilityInput extends UtilityDto {
  @ApiProperty()
  utilityId: number;
}
export class DeleteUtilityInput {
  @ApiProperty()
  utilityId: number;
}

export class CreateCardEndOfMonthStatementInput extends CardEndOfMonthStatementDto {
  @ApiProperty()
  reportId: number;
}
export class UpdateCardEndOfMonthStatementInput extends CardEndOfMonthStatementDto {
  @ApiProperty()
  statementId: number;
}
export class DeleteCardEndOfMonthStatementInput {
  @ApiProperty()
  statementId: number;
}

export class CreateRentInput extends RentDto {
  @ApiProperty()
  reportId: number;
}
export class UpdateRentInput extends RentDto {
  @ApiProperty()
  rentId: number;
}
export class DeleteRentInput {
  @ApiProperty()
  rentId: number;
}
