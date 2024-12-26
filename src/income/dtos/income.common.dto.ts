import { ApiProperty } from '@nestjs/swagger';
import { Month, OtherIncomeType } from 'src/shared/types/types';

// export class EmployeeBenefitTypeDto {
//   @ApiProperty({ example: '401k' })
//   name: string;
// }

export class EmployeeBenefitDto {
  @ApiProperty({ example: '2024-02-10T10:07:58.767Z' })
  datePayed: Date;

  @ApiProperty({ example: 20 })
  amount: number;

  @ApiProperty({ example: '401k' })
  type: string;
}

export class OtherIncomeDto {
  @ApiProperty({ example: '2024-02-10T10:07:58.767Z' })
  datePayed: Date;

  @ApiProperty({ enum: OtherIncomeType })
  type: OtherIncomeType;

  @ApiProperty({ example: 3000 })
  amount: number;
}

export class PaycheckDto {
  @ApiProperty({ example: '2024-02-10T10:07:58.767Z' })
  datePayed: Date;

  @ApiProperty({ example: 1000 })
  amount: number;
}

export class IncomeReportDto {
  @ApiProperty({ enum: Month })
  forMonth: Month;

  @ApiProperty({ example: '1000' })
  forYear: string;
}
