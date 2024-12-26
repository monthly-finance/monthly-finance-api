import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreatePaycheckInput,
  UpdatePaycheckInput,
  DeletePaycheckInput,
} from '../dtos/income.input.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaycheckService } from './paycheck.service';
import { MFContext } from 'src/shared/types/types';
import { Paycheck } from '../entities/paycheck.entity';

@Controller('income/paycheck')
@ApiBearerAuth()
@ApiTags('Paycheck')
@UseInterceptors(ClassSerializerInterceptor)
export class PaycheckController {
  constructor(private service: PaycheckService) {}

  @Post()
  @ApiOperation({ summary: 'Add Paycheck' })
  async create(
    @Body()
    createPaycheckInput: CreatePaycheckInput,
    @MFContext('userId') userId: string,
  ): Promise<Paycheck> {
    return await this.service.addPaycheck(createPaycheckInput, userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update Paycheck' })
  async update(
    @Body()
    updatePaycheckInput: UpdatePaycheckInput,
    @MFContext('userId') userId: string,
  ): Promise<Paycheck> {
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
