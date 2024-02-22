import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUtilityInput,
  UpdateUtilityInput,
  DeleteUtilityInput,
} from '../dtos/expense.input.dto';
import { UtilityService } from '../services/utility.service';

@Controller('expense/utility')
@ApiTags('Utility')
export class UtilityController {
  constructor(private service: UtilityService) {}

  @Post()
  @ApiOperation({ summary: 'Add Utility' })
  async create(
    @Body()
    createUtilityInput: CreateUtilityInput,
  ): Promise<void> {
    return await this.service.addUtility(createUtilityInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Utility' })
  async updateExpenseReport(
    @Body()
    updateUtilityInput: UpdateUtilityInput,
  ): Promise<void> {
    return await this.service.updateUtility(updateUtilityInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Utility' })
  async deleteExpenseReport(
    @Body()
    deleteUtilityInput: DeleteUtilityInput,
  ): Promise<void> {
    return await this.service.deleteUtility(deleteUtilityInput);
  }
}
