import { Month } from 'src/shared/types/types';
import { IncomeReportDto } from './income.common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeReportInput extends IncomeReportDto {}
export class UpdateIncomeReportInput extends IncomeReportDto {
  @ApiProperty()
  reportId: number;
}
export class DeleteIncomeReportInput {
  @ApiProperty()
  reportId: number;
}
export class FindOneIncomeReportInput {
  @ApiProperty({ enum: Month })
  forMonth: Month;

  @ApiProperty({ example: '2001' })
  forYear: string;
}
