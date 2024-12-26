import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateEmployeeBenefitInput,
  UpdateEmployeeBenefitInput,
  DeleteEmployeeBenefitInput,
} from '../dtos/income.input.dto';
import { MFContext } from 'src/shared/types/types';
import { EmployeeBenefitService } from './employee-benefit.service';
import { EmployeeBenefitOutput } from '../dtos/income.output.dto';
import { plainToInstance } from 'class-transformer';
import { EmployeeBenefit } from '../entities/employee-benefit/employee-benefit.entity';

@Controller('income/employee-benefit')
@ApiBearerAuth()
@ApiTags('Employee Benefit')
@UseInterceptors(ClassSerializerInterceptor)
export class EmployeeBenefitController {
  constructor(private service: EmployeeBenefitService) {}

  @Post()
  @ApiOperation({ summary: 'Add Employee Benefit' })
  async create(
    @Body()
    createInput: CreateEmployeeBenefitInput,
    @MFContext('userId') userId: string,
  ): Promise<EmployeeBenefit> {
    return await this.service.addEmployeeBenefit(createInput, userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update Employee Benefit' })
  async update(
    @Body()
    updateInput: UpdateEmployeeBenefitInput,
    @MFContext('userId') userId: string,
  ): Promise<EmployeeBenefit> {
    return await this.service.updateEmployeeBenefit(updateInput, userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Employee Benefit' })
  async delete(
    @Body()
    deleteInput: DeleteEmployeeBenefitInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.deleteEmployeeBenefit(deleteInput, userId);
  }
}
