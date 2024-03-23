import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import {
  CreatePaycheckInput,
  UpdatePaycheckInput,
  DeletePaycheckInput,
} from '../dtos/income.input.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaycheckService } from './paycheck.service';
import { MFContext } from 'src/shared/types/types';

@Controller('income/paycheck')
@ApiBearerAuth()
@ApiTags('Paycheck')
export class PaycheckController {
  constructor(private service: PaycheckService) {}

  @Post()
  @ApiOperation({ summary: 'Add Paycheck' })
  async create(
    @Body()
    createPaycheckInput: CreatePaycheckInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.addPaycheck(createPaycheckInput, userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update Paycheck' })
  async update(
    @Body()
    updatePaycheckInput: UpdatePaycheckInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.updatePaycheck(updatePaycheckInput, userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Paycheck' })
  async delete(
    @Body()
    deletePaycheckInput: DeletePaycheckInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.deletePaycheck(deletePaycheckInput, userId);
  }
}
