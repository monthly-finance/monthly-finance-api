import { Month } from 'src/shared/types/types';
import {
  CardEndOfMonthStatementDto,
  ExpenseReportDto,
  RentDto,
  UtilityDto,
} from './expense.common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUtilityInput extends UtilityDto {
  @ApiProperty()
  reportId: number;
}
export class UpdateUtilityInput extends UtilityDto {
  @ApiProperty()
  id: number;
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
  id: number;
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
  id: number;
}
export class DeleteRentInput {
  @ApiProperty()
  rentId: number;
}

export class CreateExpenseReportInput extends ExpenseReportDto {}
export class InsertExpenseReportInput {
  @ApiProperty()
  reportId: number;

  @ApiProperty({ type: [CreateUtilityInput] })
  utilities?: CreateUtilityInput[];

  @ApiProperty({ type: [CreateCardEndOfMonthStatementInput] })
  cardEndOfMonthStatement?: CreateCardEndOfMonthStatementInput[];

  @ApiProperty({ type: [CreateRentInput] })
  rent?: CreateRentInput[];
}
export class UpdateExpenseReportInput extends ExpenseReportDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: [UpdateUtilityInput] })
  utilities?: UpdateUtilityInput[];

  @ApiProperty({ type: [UpdateCardEndOfMonthStatementInput] })
  cardEndOfMonthStatement?: UpdateCardEndOfMonthStatementInput[];

  @ApiProperty({ type: [UpdateRentInput] })
  rent?: UpdateRentInput[];
}
export class DeleteExpenseReportInput {
  @ApiProperty()
  reportId?: number;

  @ApiProperty()
  utilityIds?: number[];

  @ApiProperty()
  cardIds?: number[];

  @ApiProperty()
  rentIds?: number[];
}
export class FindOneExpenseReportInput {
  @ApiProperty({ enum: Month })
  forMonth: Month;

  @ApiProperty({ example: '2001' })
  forYear: string;
}
