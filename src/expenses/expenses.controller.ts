import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseReportInput } from './dto/expense.input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFHeader } from 'src/shared/dto/common.dto';

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
}
