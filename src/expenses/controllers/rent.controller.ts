import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RentService } from '../services/rent.service';
import {
  CreateRentInput,
  DeleteRentInput,
  UpdateRentInput,
} from '../dtos/expense.input.dto';
import { RequestContext } from 'src/auth/types/auth.type';
import { MFContext } from 'src/shared/types/types';

@Controller('expense/rent')
@ApiTags('Rent')
export class RentController {
  constructor(private service: RentService) {}

  @Post()
  @ApiOperation({ summary: 'Add Rent Payment' })
  async create(
    @Body()
    createRentInput: CreateRentInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.addRent(createRentInput, context.userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update Rent Payment' })
  async updateExpenseReport(
    @Body()
    updateRentInput: UpdateRentInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.updateRent(updateRentInput, context.userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Rent Payment' })
  async deleteExpenseReport(
    @Body()
    deleteRentInput: DeleteRentInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.deleteRent(deleteRentInput, context.userId);
  }
}
