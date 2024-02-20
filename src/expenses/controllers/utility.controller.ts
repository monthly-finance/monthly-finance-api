import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateUtilityInput,
  UpdateUtilityInput,
  DeleteUtilityInput,
} from '../dtos/expense.input.dto';
import { UtilityService } from '../services/utility.service';

@Controller('utility')
@ApiTags('Utility')
export class UtilityController {
  constructor(private service: UtilityService) {}

  @Post()
  @ApiOperation({ summary: 'Add Card Statement Report' })
  async create(
    @Body()
    createUtilityInput: CreateUtilityInput,
  ): Promise<void> {
    return await this.service.addUtility(createUtilityInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Card Statement Report' })
  async updateExpenseReport(
    @Body()
    updateUtilityInput: UpdateUtilityInput,
  ): Promise<void> {
    return await this.service.updateUtility(updateUtilityInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Card Statement Report' })
  async deleteExpenseReport(
    @Body()
    deleteUtilityInput: DeleteUtilityInput,
  ): Promise<void> {
    return await this.service.deleteUtility(deleteUtilityInput);
  }
}
