import { Month } from 'src/shared/types/types';
import { ExpenseReportDto } from './expense.common.dto';
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
