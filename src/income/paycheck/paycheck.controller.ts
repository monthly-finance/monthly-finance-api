import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import {
  CreatePaycheckInput,
  UpdatePaycheckInput,
  DeletePaycheckInput,
} from '../dtos/income.input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaycheckService } from './paycheck.service';

@Controller('income/paycheck')
@ApiTags('Paycheck')
export class PaycheckController {
  constructor(private service: PaycheckService) {}

  @Post()
  @ApiOperation({ summary: 'Add Paycheck' })
  async create(
    @Body()
    createPaycheckInput: CreatePaycheckInput,
  ): Promise<void> {
    return await this.service.addPaycheck(createPaycheckInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Paycheck' })
  async update(
    @Body()
    updatePaycheckInput: UpdatePaycheckInput,
  ): Promise<void> {
    return await this.service.updatePaycheck(updatePaycheckInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Paycheck' })
  async delete(
    @Body()
    deletePaycheckInput: DeletePaycheckInput,
  ): Promise<void> {
    return await this.service.deletePaycheck(deletePaycheckInput);
  }
}
