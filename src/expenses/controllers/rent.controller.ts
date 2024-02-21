import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RentService } from '../services/rent.service';
import {
  CreateRentInput,
  DeleteRentInput,
  UpdateRentInput,
} from '../dtos/expense.input.dto';

@Controller('expense/rent')
@ApiTags('Rent')
export class RentController {
  constructor(private service: RentService) {}

  @Post()
  @ApiOperation({ summary: 'Add Rent Payment' })
  async create(
    @Body()
    createRentInput: CreateRentInput,
  ): Promise<void> {
    return await this.service.addRent(createRentInput);
  }

  @Put()
  @ApiOperation({ summary: 'Update Rent Payment' })
  async updateExpenseReport(
    @Body()
    updateRentInput: UpdateRentInput,
  ): Promise<void> {
    return await this.service.updateRent(updateRentInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Rent Payment' })
  async deleteExpenseReport(
    @Body()
    deleteRentInput: DeleteRentInput,
  ): Promise<void> {
    return await this.service.deleteRent(deleteRentInput);
  }
}
