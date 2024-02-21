import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreatePaycheckInput,
  UpdatePaycheckInput,
  DeletePaycheckInput,
} from '../dtos/income.input.dto';
import { PaycheckService } from '../paycheck/paycheck.service';

@Controller('income/employee-benefit')
@ApiTags('Employee Benefit')
export class EmployeeBenefitController {
  constructor(private service: PaycheckService) {}

  @Post()
  @ApiOperation({ summary: 'Add Employee Benefit' })
  async create(
    @Body()
    createPaycheckInput: CreatePaycheckInput,
  ): Promise<void> {
    return await this.service.addPaycheck(createPaycheckInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Employee Benefit' })
  async update(
    @Body()
    updatePaycheckInput: UpdatePaycheckInput,
  ): Promise<void> {
    return await this.service.updatePaycheck(updatePaycheckInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Employee Benefit' })
  async delete(
    @Body()
    deletePaycheckInput: DeletePaycheckInput,
  ): Promise<void> {
    return await this.service.deletePaycheck(deletePaycheckInput);
  }
}
