import { Month } from 'src/shared/types/types';
import {
  EmployeeBenefitDto,
  IncomeReportDto,
  OtherIncomeDto,
  PaycheckDto,
} from './income.common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaycheckInput extends PaycheckDto {
  @ApiProperty()
  reportId: number;
}
export class UpdatePaycheckInput extends PaycheckDto {
  @ApiProperty()
  id: number;
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
  id: number;
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
  id: number;
}
export class DeleteOtherIncomeInput {
  @ApiProperty()
  otherIncomeId: number;
}

export class CreateIncomeReportInput extends IncomeReportDto {}
export class InsertIncomeReportInput {
  @ApiProperty()
  reportId: number;

  @ApiProperty({ type: [CreateEmployeeBenefitInput] })
  employeeBenefit: CreateEmployeeBenefitInput[];

  @ApiProperty({ type: [CreatePaycheckInput] })
  paycheck: CreatePaycheckInput[];

  @ApiProperty({ type: [CreateOtherIncomeInput] })
  otherIncome: CreateOtherIncomeInput[];
}
export class UpdateIncomeReportInput extends IncomeReportDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: [UpdateEmployeeBenefitInput] })
  employeeBenefit: UpdateEmployeeBenefitInput[];

  @ApiProperty({ type: [UpdatePaycheckInput] })
  paycheck: UpdatePaycheckInput[];

  @ApiProperty({ type: [UpdateOtherIncomeInput] })
  otherIncome: UpdateOtherIncomeInput[];
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
