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
  CreateOtherIncomeInput,
  UpdateOtherIncomeInput,
  DeleteOtherIncomeInput,
} from '../dtos/income.input.dto';
import { OtherIncomeService } from './other-income.service';
import { MFContext } from 'src/shared/types/types';
import { OtherIncome } from '../entities/other-income.entity';

@Controller('income/other-income')
@ApiBearerAuth()
@ApiTags('Other Income')
@UseInterceptors(ClassSerializerInterceptor)
export class OtherIncomeController {
  constructor(private service: OtherIncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Add OtherIncome' })
  async create(
    @Body()
    createOtherIncomeInput: CreateOtherIncomeInput,
    @MFContext('userId') userId: string,
  ): Promise<OtherIncome> {
    return await this.service.addOtherIncome(createOtherIncomeInput, userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update OtherIncome' })
  async update(
    @Body()
    updateOtherIncomeInput: UpdateOtherIncomeInput,
    @MFContext('userId') userId: string,
  ): Promise<OtherIncome> {
    return await this.service.updateOtherIncome(updateOtherIncomeInput, userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete OtherIncome' })
  async delete(
    @Body()
    deleteOtherIncomeInput: DeleteOtherIncomeInput,
    @MFContext('userId') userId: string,
  ): Promise<void> {
    return await this.service.deleteOtherIncome(deleteOtherIncomeInput, userId);
  }
}
