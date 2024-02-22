import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ExpenseReportService } from '../services/expense-report.service';
import {
  CreateExpenseReportInput,
  DeleteExpenseReportInput,
  FindOneExpenseReportInput,
  UpdateExpenseReportInput,
} from '../dtos/expense.input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFHeader } from 'src/shared/dto/common.dto';
import { ExpenseReport } from '../entities/expense-report.entity';

@Controller('expense/expense-report')
@ApiTags('Expense Report')
export class ExpensesController {
  constructor(private service: ExpenseReportService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Expense Reports' })
  async findAllExpenseReport(
    @Headers() headers: MFHeader,
  ): Promise<ExpenseReport[]> {
    const res = await this.service.findAll(headers.userid);
    return res;
  }

  @Post()
  @ApiOperation({ summary: 'Create Expense Report' })
  async createExpenseReport(
    @Headers() headers: MFHeader,
    @Body() createExpenseReportInput: CreateExpenseReportInput,
  ): Promise<void> {
    return await this.service.create(headers.userid, createExpenseReportInput);
  }

  @Post('findOne')
  @ApiOperation({ summary: 'FindOne Expense Report' })
  async findOneExpenseReport(
    @Headers() headers: MFHeader,
    @Body() findOneExpenseReportInput: FindOneExpenseReportInput,
  ): Promise<ExpenseReport> {
    const res = await this.service.findByMonthAndYear(
      headers.userid,
      findOneExpenseReportInput,
    );
    return res;
  }

  @Put()
  @ApiOperation({ summary: 'Update Expense Report' })
  async updateExpenseReport(
    @Body() updateExpenseReportInput: UpdateExpenseReportInput,
  ): Promise<void> {
    return await this.service.update(updateExpenseReportInput);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Expense Report' })
  async deleteExpenseReport(
    @Body() deleteExpenseReportInput: DeleteExpenseReportInput,
  ): Promise<void> {
    return await this.service.delete(deleteExpenseReportInput);
  }
}
