import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateOtherIncomeInput,
  UpdateOtherIncomeInput,
  DeleteOtherIncomeInput,
} from '../dtos/income.input.dto';
import { OtherIncomeService } from './other-income.service';

@Controller('income/other-income')
@ApiTags('Other Income')
export class OtherIncomeController {
  constructor(private service: OtherIncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Add OtherIncome' })
  async create(
    @Body()
    createOtherIncomeInput: CreateOtherIncomeInput,
  ): Promise<void> {
    return await this.service.addOtherIncome(createOtherIncomeInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update OtherIncome' })
  async update(
    @Body()
    updateOtherIncomeInput: UpdateOtherIncomeInput,
  ): Promise<void> {
    return await this.service.updateOtherIncome(updateOtherIncomeInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete OtherIncome' })
  async delete(
    @Body()
    deleteOtherIncomeInput: DeleteOtherIncomeInput,
  ): Promise<void> {
    return await this.service.deleteOtherIncome(deleteOtherIncomeInput);
  }
}
