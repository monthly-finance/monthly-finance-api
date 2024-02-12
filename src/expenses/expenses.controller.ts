import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseReportInput } from './dtos/expense.input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFHeader } from 'src/shared/dto/common.dto';
import { ExpenseReport } from './entities/expense-report.entity';

@Controller('expenses')
@ApiTags('Expense Report')
export class ExpensesController {
  constructor(private service: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create Expense Report' })
  async createExpenseReport(
    @Headers() headers: MFHeader,
    @Body() createExpenseReportInput: CreateExpenseReportInput,
  ): Promise<void> {
    return await this.service.create(headers.userid, createExpenseReportInput);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Expense Reports' })
  async findAllExpenseReport(
    @Headers() headers: MFHeader,
  ): Promise<ExpenseReport[]> {
    const res = await this.service.findAll(headers.userid);
    return res;
  }
}
