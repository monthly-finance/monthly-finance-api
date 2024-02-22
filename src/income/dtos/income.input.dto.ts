import { Month } from 'src/shared/types/types';
import {
  EmployeeBenefitDto,
  IncomeReportDto,
  OtherIncomeDto,
  PaycheckDto,
} from './income.common.dto';
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

export class CreatePaycheckInput extends PaycheckDto {
  @ApiProperty()
  reportId: number;
}
export class UpdatePaycheckInput extends PaycheckDto {
  @ApiProperty()
  paycheckId: number;
}
export class DeletePaycheckInput {
  @ApiProperty()
  paycheckId: number;
}

export class CreateEmployeeBenefitInput extends EmployeeBenefitDto {
  @ApiProperty()
  reportId: number;
}
export class UpdateEmployeeBenefitInput extends EmployeeBenefitDto {
  @ApiProperty()
  employeeBenefitId: number;
}
export class DeleteEmployeeBenefitInput {
  @ApiProperty()
  employeeBenefitId: number;
}

export class CreateOtherIncomeInput extends OtherIncomeDto {
  @ApiProperty()
  reportId: number;
}
export class UpdateOtherIncomeInput extends OtherIncomeDto {
  @ApiProperty()
  otherIncomeId: number;
}
export class DeleteOtherIncomeInput {
  @ApiProperty()
  otherIncomeId: number;
}
