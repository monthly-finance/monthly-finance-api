import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Put,
  Delete,
  Request,
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
import { MFContext } from 'src/shared/types/types';
import { RequestContext } from 'src/auth/types/auth.type';

@Controller('expense/expense-report')
@ApiTags('Expense Report')
export class ExpensesController {
  constructor(private service: ExpenseReportService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Expense Reports' })
  async findAllExpenseReport(
    @MFContext() context: RequestContext,
  ): Promise<ExpenseReport[]> {
    const res = await this.service.findAll(context.userId);
    return res;
  }

  @Post()
  @ApiOperation({ summary: 'Create Expense Report' })
  async createExpenseReport(
    @Body() createExpenseReportInput: CreateExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.create(context.userId, createExpenseReportInput);
  }

  @Post('findOne')
  @ApiOperation({ summary: 'FindOne Expense Report' })
  async findOneExpenseReport(
    @MFContext() context: RequestContext,
    @Body() findOneExpenseReportInput: FindOneExpenseReportInput,
  ): Promise<ExpenseReport> {
    const res = await this.service.findByMonthAndYear(
      context.userId,
      findOneExpenseReportInput,
    );
    return res;
  }

  @Put()
  @ApiOperation({ summary: 'Update Expense Report' })
  async updateExpenseReport(
    @Body() updateExpenseReportInput: UpdateExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.update(updateExpenseReportInput, context.userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Expense Report' })
  async deleteExpenseReport(
    @Body() deleteExpenseReportInput: DeleteExpenseReportInput,
    @MFContext() context: RequestContext,
  ): Promise<void> {
    return await this.service.delete(deleteExpenseReportInput, context.userId);
  }
}
